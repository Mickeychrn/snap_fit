const hbs = require('nodemailer-express-handlebars');

// @azure/storage-blob functions needed
const {
  Aborter,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL,
  SharedKeyCredential,
  uploadStreamToBlockBlob,
} = require('@azure/storage-blob');

const express = require('express');

const router = express.Router();

const multer = require('multer');

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).array('images');
const getStream = require('into-stream');
const MailConfig = require('../config/email');
const knex = require('./database');

const gmailTransport = MailConfig.GmailTransport;
const containerName = 'images';
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
const ONE_MINUTE = 60 * 1000;
const sharedKeyCredential = new SharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY,
);
const pipeline = StorageURL.newPipeline(sharedKeyCredential);
const serviceURL = new ServiceURL(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline,
);

/**
 * @description prefixes a random integer as a string
 * to the given string
 * @author Alexander Parker - n9979280
 * @param {string} originalName
 * @returns a concatenation of a random integer + the given string
 */
function getBlobName(orderID, originalName) {
  // Use a random number to generate a unique file name,
  // removing "0." from the start of the string.
  const identifier = Math.random().toString().replace(/0\./, '');

  // Return orderID, identifier and originalName concatenated
  // also replace and spaces in the original file name with an underscore
  // fixes a bug that would not allow the lightbox to show an image on the dashboard
  return `${orderID}-${identifier}-${originalName.replace(/\s|\(|\)/gm, '_')}`;
}

/**
 * @description sends a notification email to
 * the admin of the dashboard giving information about the customer
 * name and the orderID. Uses the templates provided in ../views/email/
 * @author Alexander Parker - n9979280
 * @param {string} customerName the name given by the customer
 * @param {string} customerOrderID - the unique orderID
 */
async function sendNotification(customerName, customerOrderID) {
  // Options for nodemailer-express-handlebars
  // The directory variables may need to be changed
  const handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: './routes/email',
      layoutsDir: './routes/email',
      defaultLayout: 'notification.hbs',
    },
    viewPath: './routes/email',
    extName: '.hbs',
  };

  // Defines recipients, subject, template and sender for the email
  const HelperOptions = {
    from: '"Snap & Fit Dashboard" <alexanderparkerdev@gmail.com>',
    to: 'alexanderparker1992@gmail.com',
    subject: 'You have received a new Snap & Fit query',
    template: 'notification', // Template to use in ../views/email/
    context: { // Objects which can be passed to templates
      name: customerName,
      link: process.env.DASHBOARD_URL,
      orderID: customerOrderID,
    },
  };

  gmailTransport.use('compile', hbs(handlebarOptions)); // Configure gmailTransport option
  MailConfig.ViewOption(gmailTransport, hbs); // Tells where to find the templates
  await gmailTransport.sendMail(HelperOptions);
  console.log(`OrderID ${customerOrderID}'s notification email sent ${new Date()}`); // Logging for success
  return Promise.resolve(true);
}

/**
 * @description
 * @author Alexander Parker - n9979280
 * @param {*} req - The request object
 * @returns the uniqueID of the database entry or 0 on failure
 */
async function uploadDataToDatabase(req) {
  const dataToUpload = {}; // New empty object for data
  // const customerDataToUpload = {};
  // Upload image to blob store

  // Upload form data (text) to the database
  if (req.body.tyreSize) { // If tyreSize is present, add to the data object
    dataToUpload.TyreSize = req.body.tyreSize;
  }
  if (req.body.fName) { // If present ...
    dataToUpload.Fname = req.body.fName;
    // customerDataToUpload.Fname = req.body.fName;
  }
  if (req.body.email) { // If present ...
    dataToUpload.Email = req.body.email;
    // customerDataToUpload.email = req.body.email;
  }
  if (req.body.quantity) { // If present ...
    dataToUpload.Quantity = req.body.quantity;
  }
  if (req.body.postalCode) { // If present ...
    dataToUpload.PostalCode = req.body.postalCode;
    // customerDataToUpload.postalCode = req.body.postalCode;
  }
  if (req.body.phoneNumber) { // If present ...
    dataToUpload.Phone = req.body.phoneNumber;
    // customerDataToUpload.Phone = req.body.phoneNumber;
  }
  if (req.body.carBrand) { // If present ...
    dataToUpload.CarBrand = req.body.carBrand;
  }
  if (req.body.carModel) { // If present ...
    dataToUpload.CarModel = req.body.carModel;
  }
  if (req.body.preferredBrand) { // If present ...
    dataToUpload.PrefferedBrand = req.body.preferredBrand;
  }
  if (req.body.voucherCode) { // If present ...
    dataToUpload.VoucherCode = req.body.voucherCode;
  }
  if (req.body.agreedToTerms) { // If present ...
    dataToUpload.agreedToTerms = req.body.agreedToTerms;
  }

  try {
    // Insert data into the database
    // See http://knexjs.org/#Builder-insert
    const OrderID = await knex('SnapfitQueries').insert(dataToUpload, ['OrderID']); // Store in the database,
    // dataToUpload = {TyreSize: '11;11;11', fName: "Alfie", ...}
    // (..., [str]) e.g. (dataToUpload, ['OrderID', 'Phone'], it resolves the promise / fulfills
    // the callback with an array of all the added rows with specified columns

    // Log sucessful database insert
    console.log(`OrderID ${OrderID}'s data inserted into database at ${new Date()}`);
    return Promise.resolve(OrderID);
  } catch (error) { // Catch error uploading to the database
    return Promise.reject(error);
  }
}

/**
 * @description Updates the imageURLS in the database based on the ID
 * as a primary key
 * @author Alexander Parker - n9979280
 * @param {array} imageURLS - Array of image URL strings
 * @param {string} uniqueID - The uniqueID from the Database
 * @returns Promise (true) if update succeeded
 */
async function uploadImagesURLSToDB(imageURLS, ID) {
  await knex('SnapfitQueries')
    .where({
      OrderID: ID,
    })
    .update({
      ImagePath: imageURLS,
    });
  return Promise.resolve(true);
}

/**
 * @description uploads an image from a HTTP POST request to
 * and Azure Blob storage container
 * @author Alexander Parker - n9979280
 * @param {any} req - the request object
 * @param {string} uniqueID - The uniqueID from the Database
 * @returns true if upload succeeded
 */
async function uploadImagesToBlobStore(req, uniqueID) {
  try { // To upload image and data
    if (req.files) {
      const imageURLS = []; // Will be an array of all images uploaded URLS

      // Map this promise so that all files can be uploaded in parallel
      await Promise.all(req.files.map(async (file) => {
        const aborter = Aborter.timeout(30 * ONE_MINUTE);
        const blobName = getBlobName(uniqueID, file.originalname);
        const stream = getStream(file.buffer);
        const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
        const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

        // Wait to resolve promise until all uploads are completed
        await uploadStreamToBlockBlob(aborter, stream,
          blockBlobURL, uploadOptions.bufferSize, uploadOptions.maxBuffers, { blobHTTPHeaders: { blobContentType: 'image/jpeg' } });

        // Push the URL to the imageURLS array
        imageURLS.push(`https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/images/${blobName}`);
      }));

      // Logging
      console.log(`OrderID ${uniqueID} - ${req.files.length} image(s) uploaded to Blob storage at ${new Date()}`);

      // Return the array of imageURLS
      return Promise.resolve(imageURLS);
    }
  } catch (error) {
    console.log('There was an error uploading the image to the Blob storage', error);
    return Promise.reject(error);
  }

  // Logging for no images
  console.log(`OrderID ${uniqueID} had no images to upload - ${new Date()}`);
  return Promise.resolve([null]);
}

// This will catch all calls to /upload and handle them by sending
// supplied images to an Azure BLOB store and storing any other formdata
// into a database.
router.post('/upload', uploadStrategy, async (req, res) => {
  console.log(`New query recieved at ${new Date()}`); // Log new query

  try {
    // upload data
    const uniqueID = await uploadDataToDatabase(req, res);

    // upload images
    const imagesUploaded = await uploadImagesToBlobStore(req, uniqueID);

    // modify database to include URLs to all uploaded images
    const imageURLSUploadedToDB = await uploadImagesURLSToDB(imagesUploaded, uniqueID);

    // send notification email
    const notificationSent = await sendNotification(req.body.fName, uniqueID);

    // Check if all functions completed correctly and synchronously
    if (uniqueID > 0 && imagesUploaded !== null && notificationSent && imageURLSUploadedToDB) {
      // Logging for complete order
      console.log(`OrderID ${uniqueID} sucessfully handled`);
      res.status(200).json({ // Respond to http POST
        orderID: uniqueID, // Give unique ID
        message: 'Thank you, we have received your information and will be in touch soon.', // And a message
      });
    }
  } catch (err) { // Catch error for the try block
    console.log('There was an error in router.post', err); // Error logging
    res.status(500).json({ // Respond to http POST
      error: 'An error has occurred',
    });
  }
});

module.exports = router;
