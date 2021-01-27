const {
  Aborter,
  ContainerURL,
  ServiceURL,
  StorageURL,
  SharedKeyCredential,
} = require('@azure/storage-blob');

const express = require('express');

const router = express.Router();
const containerName = 'thumbnails';

const sharedKeyCredential = new SharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY,
);
const pipeline = StorageURL.newPipeline(sharedKeyCredential);

const serviceURL = new ServiceURL(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline,
);

const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

const upload = require('./upload');
const customerDataRouter = require('./customerData');
const allTyres = require('./getAllTyres');
const tyreSearch = require('./getTyreSizes');
const getTyres = require('./getTyres');
const getBasics = require('./getBasics');

router.use(upload);
router.use(customerDataRouter);
router.use(allTyres);
router.use(tyreSearch);
router.use(getTyres);
router.use(getBasics);

router.get('/', async (req, res) => {
  let viewData;

  try {
    const listBlobsResponse = await containerURL.listBlobFlatSegment(Aborter.none);

    viewData = {
      title: 'Home',
      viewName: 'index',
      accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
      containerName,
    };

    if (listBlobsResponse.segment.blobItems.length) {
      viewData.thumbnails = listBlobsResponse.segment.blobItems;
    }
  } catch (err) {
    viewData = {
      title: 'Error',
      viewName: 'error',
      message: 'There was an error contacting the blob storage container.',
      error: err,
    };
    res.status(500);
  } finally {
    res.render(viewData.viewName, viewData);
  }
});

module.exports = router;
