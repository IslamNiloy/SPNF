const { parsePhoneNumberFromString, isValidPhoneNumber, AsYouType } = require('libphonenumber-js');
const countries = require('i18n-iso-countries');
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const { refreshAccessToken,getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../auth/hubspotAuth');
const logger = require('../utils/logger'); // Add logger
const userModel = require('../model/user.model');
const paymentModel = require('../model/payment.model');
const { updateAPICount, packageCondition, CheckPhoneNumberpackageCondition, CheckPhoneNumberUpdateAPICount } = require('./Logic/packageConditions');
const redisClient = require('./Logic/bulkCountInsertion');
const axios = require('axios');

//////////////////////// PHONE NUMBER //////////////////////////
const DEFAULT_COUNTRY = 'US';
const MIN_PHONE_NUMBER_LENGTH = 7;
const MAX_PHONE_NUMBER_LENGTH = 15;

const getCountryCode = (country, country_text) => {
  if (country_text) {
    // Check if country_text is a valid country code
    const countryCodes = countries.getAlpha2Codes();
    if (countryCodes[country_text.toUpperCase()]) {
      return country_text.toUpperCase();
    }

    // Check if country_text is a full country name
    const countryNames = countries.getNames("en");
    const foundCode = Object.keys(countryNames).find(code => countryNames[code].toLowerCase() === country_text.toLowerCase());
    if (foundCode) {
      return foundCode;
    }
  }

  if (country) {
    // Check if country is a valid country code
    const countryCodes = countries.getAlpha2Codes();
    if (countryCodes[country.toUpperCase()]) {
      return country.toUpperCase();
    }

    // Check if country is a full country name
    const countryNames = countries.getNames("en");
    const foundCode = Object.keys(countryNames).find(code => countryNames[code].toLowerCase() === country.toLowerCase());
    if (foundCode) {
      return foundCode;
    }
  }

  // Default to US if no valid country code is found
  return DEFAULT_COUNTRY;
};

/*adding redis code starts for phone number*/
const incrementAPICount = async (portalID, funcName) => {
  try {
    const result = await redisClient.incrAsync(portalID, funcName);
    console.log('After increment:', result); // Should log the incremented value

  } catch (err) {
    console.error('Redis increment error:', err);
  }
};
/*end of redis code*/

exports.phoneNumber = async (req, res) => {
  const { phoneNumber, country, country_text, hs_object_id } = req.body;
  let propertyName = req.body.propertyName;
  if (propertyName === null || propertyName === undefined){
    propertyName = "pf_formatted_phone_number_14082001"
  }
  logger.info(`--------logging at phoneNumber func with ${phoneNumber}, ${country}, ${country_text}-------`);
  try {
    //const accessToken = await getAccessToken(req);
    //const accInfo = await getAccountInfo(accessToken);
    const check = await packageCondition(req.body.portalID);

    const User = await userModel.findOne({ portalID: req.body.portalID });
    console.log("User: ===========" + User.email);
    logger.info("req.body in phoneNumber: === " + JSON.stringify(req.body));
    logger.info("phoneNumber in phoneNumber: === " + phoneNumber);
    const paymentInfo = await paymentModel.findOne({ portalID: req.body.portalID }).sort({ createdAt: -1 });
    // console.log("UpaymentInfoser: ===========" + paymentInfo);
    if (!check) {
      return res.status(200).json({
        "outputFields": {
          "Message": "API Limit Exceeded",
          "hs_execution_state": "FAILED"
        }
      });
    }
    if (paymentInfo && paymentInfo.status == "cancelled") {
      return res.status(200).json({
        "outputFields": {
          "Message": "API Limit Exceeded",
          "hs_execution_state": "FAILED"
        }
      });
    }
    else if (check) {
      await updateAPICount(req.body.portalID);
      //incrementAPICount(req.body.portalID, "phoneNumber");
      const formattedNumber = formatPhoneNumber(phoneNumber, country, country_text);
      await updateContactProperty(propertyName,formattedNumber,hs_object_id,User.accessToken, req);
      res.json({
        "outputFields": {
          "Formatted_Phone_Number": formattedNumber,
          "hs_execution_state": "SUCCESS"
        }
      });
    } else {
      res.json("Update your plan");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const formatPhoneNumber = (phoneNumber, country, country_text) => {
  const countryCode = getCountryCode(country, country_text);

  // Remove extension part if exists
  const extensionMatch = phoneNumber.match(/(ext\.?|extension)\s?(\d+)/i);
  const mainPhoneNumber = extensionMatch ? phoneNumber.replace(extensionMatch[0], '').trim() : phoneNumber;

  // Remove all non-digit characters from the main phone number
  const sanitizedPhoneNumber = mainPhoneNumber.replace(/\D+/g, '');

  // Check if the phone number length is within the valid range
  if (sanitizedPhoneNumber.length < MIN_PHONE_NUMBER_LENGTH || sanitizedPhoneNumber.length > MAX_PHONE_NUMBER_LENGTH) {
    throw new Error('Invalid phone number length');
  }

  let parsedNumber = parsePhoneNumberFromString(sanitizedPhoneNumber, countryCode);
  if (!parsedNumber || !parsedNumber.isValid()) {
    // Attempt to format the number as it is typed
    parsedNumber = new AsYouType(countryCode).input(sanitizedPhoneNumber);
    parsedNumber = parsePhoneNumberFromString(parsedNumber, countryCode);
  }

  if (parsedNumber && parsedNumber.isValid()) {
    return parsedNumber.formatInternational().replace(/\s+/g, '');
  }

  throw new Error('Invalid phone number');
};


//Country code
exports.getCountry = async (req, res) => {
  try {
    const countryCodes = countries.getAlpha2Codes();
    const countryNames = countries.getNames("en");

    const options = Object.keys(countryCodes).map(code => ({
      value: code,
      label: countryNames[code]
    }));

    res.json({ options });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};



/////////////////////// Check Phone Number START //////////////////////////////////
const checkPhoneNumber = (phoneNumber, country) => {
  // Check if the phone number contains spaces
  if (/\s/.test(phoneNumber)) {
    return 'Space in the Number';
  }

  // Check if the phone number contains hyphens
  if (/-/.test(phoneNumber)) {
    return 'Hyphen in the Number';
  }

  // Check if the phone number contains brackets
  if (/\(|\)/.test(phoneNumber)) {
    return 'Bracket in the Number';
  }

  // Check if the phone number contains non-numeric text (excluding the '+' symbol)
  if (/[^\d\+\s\-()]/.test(phoneNumber)) {
    return 'Contains Invalid Characters';
  }

  // Check if the phone number contains any other non-digit text (excluding the '+' symbol)
  if (/\D/.test(phoneNumber.replace('+', ''))) {
    return 'Contains Text or Special Characters';
  }

  // Remove all non-digit characters
  const sanitizedPhoneNumber = phoneNumber.replace(/\D+/g, '');

  // Check if the phone number length is within the valid range
  if (sanitizedPhoneNumber.length < MIN_PHONE_NUMBER_LENGTH) {
    return 'Too Short';
  }
  if (sanitizedPhoneNumber.length > MAX_PHONE_NUMBER_LENGTH) {
    return 'Too Long';
  }

  const parsedNumber = parsePhoneNumberFromString(phoneNumber);

  // Check if country correctly matches
  if (country) {
    const countryCode = getCountryCode(country, null)
    if (countryCode !== undefined && parsedNumber) {
      console.log(countryCode)
      if (parsedNumber.country != countryCode) {
        return 'Country Mismatch';
      }
    }
  }

  // Check if the phone number includes a country code
  if (!parsedNumber || !parsedNumber.country) {
    return 'No Country Code';
  }

  // Check if the phone number is valid
  if (!parsedNumber.isValid()) {
    return 'Invalid';
  }

  return 'Correctly Formatted';
};

exports.checkPhoneNumber = async (req, res) => {
  const { phoneNumber, country, portalID,hs_object_id, object } = req.body;
  let propertyName = req.body.propertyName;
  if (propertyName === null || propertyName === undefined){
    propertyName = "pf_number_quality_14082001"
  }
  // console.log("******** Req body *********", phoneNumber, country, propertyName, portalID, object, req.body, "******************")
  console.log(req.body)

  const check = await packageCondition(portalID);
  const User = await userModel.findOne({ portalID: req.body.portalID });
  // console.log("User in checkPhoneNumber: ===========" + User.email);
  const paymentInfo = await paymentModel.findOne({ portalID: req.body.portalID }).sort({ createdAt: -1 });
  // console.log("UpaymentInfoser: ===========" + paymentInfo + "check ===" + check);
  // logger.info("req.body in checkPhoneNumber: === " + JSON.stringify(req.body));
  // logger.info("phoneNumber in checkPhoneNumber: === " + phoneNumber);
  if (!check) {
    return res.status(200).json({
      "outputFields": {
        "quality": "API Limit Exceeded",
        "hs_execution_state": "FAILED"
      }
    });
  }
  if (paymentInfo && paymentInfo.status == "cancelled") {
    return res.status(200).json({
      "outputFields": {
        "quality": "You have cancelled your subscription",
        "hs_execution_state": "FAILED"
      }
    });
  }
  else if (check) {
    // console.log("checking is fine in check phone number");
    await CheckPhoneNumberUpdateAPICount(req.body.portalID);
    //incrementAPICount(req.body.portalID, "checkPhoneNumber");
    if (!phoneNumber) {
      return res.status(200).json({
        "outputFields": {
          "quality": "Empty",
          "hs_execution_state": "SUCCESS"
        }
      });
    }

    const result = checkPhoneNumber(phoneNumber, country);
    await updateContactProperty(propertyName,result,hs_object_id,User.accessToken, req);
    return res.status(200).json({
      "outputFields": {
        "quality": result,
        "hs_execution_state": "SUCCESS"
      }
    });
  }
};
/////////////////////// Check Phone Number END //////////////////////////////////

const updateContactProperty = async (propertyName, value, contactId, token, req) => {
  try {
    const response = await axios.patch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, 
      {
        properties: {
          [propertyName]: value 
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Contact updated:', response.data);
  } catch (error) {
    if (error.response && error.response.data.category === 'EXPIRED_AUTHENTICATION') {
      console.log('Token expired, refreshing access token...');
      try {
        const newTokenData = await refreshAccessToken(req);
        const newAccessToken = newTokenData.access_token;

        req.session.access_token = newTokenData.access_token;
        req.session.refresh_token = newTokenData.refresh_token;

        console.log('Retrying with new access token...');
        const retryResponse = await axios.patch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, 
          {
            properties: {
              [propertyName]: value 
            }
          },
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('Contact updated on retry:', retryResponse.data);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError.response ? refreshError.response.data : refreshError.message);
      }
    } else {
      console.error('Error updating contact:', error.response ? error.response.data : error.message);
    }
  }
};

