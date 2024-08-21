const axios = require('axios');
const qs = require('qs');
const logger = require('../utils/logger'); // Add logger
let { STRIPE_DATA_DB } = require('../controllers/Logic/stripe_Webhook');
let userData = {};
// const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://hs-app-lemon.vercel.app"
const BASE_URL = "https://localhost:3003"
const getTokenHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
};

const exchangeForTokens = async (req, exchangeProof) => {
  try {
    const url_encoded_string = qs.stringify(exchangeProof);
    const responseBody = await axios.post('https://api.hubapi.com/oauth/v1/token', url_encoded_string, {
      headers: getTokenHeaders
    });
    const tokens = responseBody.data;

    req.session.refresh_token = tokens.refresh_token;
    req.session.access_token = tokens.access_token;
    req.session.expires_in = tokens.expires_in;
    req.session.token_timestamp = Date.now();

    logger.info(`req.session.refresh_token at exchangeForTokens: ${req.session.refresh_token}`)
    logger.info(`req.session.access_token at exchangeForTokens: ${req.session.access_token}`)
    logger.info(`req.session.expires_in at exchangeForTokens: ${req.session.expires_in}`)
    logger.info(`req.session.token_timestamp at exchangeForTokens: ${req.session.token_timestamp}`)
    
    logger.info(`Received access token and refresh token for session: ${req.sessionID}`);
    return tokens.access_token;
  } catch (e) {
    logger.error(`Error exchanging ${exchangeProof.grant_type} for access token: ${e.response ? e.response.data : e.message}`);
    return { message: e.response ? e.response.data.message : e.message };
  }
};

const refreshAccessToken = async (req) => {
  const refreshTokenProof = {
    grant_type: 'refresh_token',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: BASE_URL + '/oauth-callback',
    refresh_token: req.session.refresh_token
  };
  return await exchangeForTokens(req, refreshTokenProof);
};

const getAccessToken = async (req) => {
  const tokenAge = Date.now() - req.session.token_timestamp;
  const tokenLifetime = req.session.expires_in * 1000;

  if (tokenAge >= tokenLifetime) {
    await refreshAccessToken(req);
  }
  return req.session.access_token;
};

const isAuthorized = (req) => {
  return !!req.session.refresh_token;
};

const getContact = async (accessToken) => {
  console.log("at /getContact profile" + accessToken);
  try {
    const header= {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    const result = await axios.get('https://api.hubapi.com/contacts/v1/lists/all/contacts/all', { headers });
    console.log("----------getContact-----------"+ result)
    return result.data[0];
  } catch (e) {
    logger.error(`Unable to retrieve contact: ${e.message}`);
    return parseErrorResponse(e);
  }
};

const getAccountInfo = async (accessToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    const result = await axios.get('https://api.hubapi.com/account-info/v3/details', { headers });
   // DATA FOR mongo USER SCHEMA
    userData = {
      ...STRIPE_DATA_DB,
      portalID: result.data.portalId,
      accountType: result.data.accountType,
      timeZone: result.data.timeZone,
      companyCurrency: result.data.companyCurrency,
      uiDomain: result.data.uiDomain,
      dataHostingLocation: result.data.dataHostingLocation,
      additionalCurrencies: result.data.additionalCurrencies,
     };
    console.log(userData);

    return userData;
  } catch (e) {
    logger.error(`Unable to retrieve account info: ${e.message}`);
    return parseErrorResponse(e);
  }
};

const parseErrorResponse = (error) => {
  try {
    return JSON.parse(error.response.body);
  } catch (parseError) {
    logger.error(`Error parsing response: ${parseError.message}`);
    return { status: 'error', message: 'An error occurred', details: error.message };
  }
};

module.exports = {
  exchangeForTokens,
  getAccessToken,
  isAuthorized,
  getContact,
  getAccountInfo
};
