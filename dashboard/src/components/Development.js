const DEVELOPMENT = false;
const API_URL_PRODUCTION = 'https://snapfit-api.azurewebsites.net/';
const API_URL_DEVELOPMENT = 'http://localhost:3002/';
let temp = '';
if (DEVELOPMENT) {
  temp = API_URL_DEVELOPMENT;
} else { temp = API_URL_PRODUCTION; }
const baseURL = temp;

module.exports = baseURL;
