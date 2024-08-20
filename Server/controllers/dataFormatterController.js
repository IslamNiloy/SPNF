const { parsePhoneNumberFromString, AsYouType } = require('libphonenumber-js');
const countries = require('i18n-iso-countries');
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../auth/hubspotAuth');
const logger = require('../utils/logger'); // Add logger
const userModel = require('../model/user.model');
const paymentModel = require('../model/payment.model');
const { updateAPICount, packageCondition } = require('./Logic/packageConditions');



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


exports.phoneNumber = async (req, res) => {
  const { phoneNumber, country, country_text } = req.body;
  logger.info(`--------logging at phoneNumber func with ${phoneNumber}, ${country}, ${country_text}-------`);
  try {
    if (isAuthorized(req)) {
      const accessToken = await getAccessToken(req);
      const accInfo = await getAccountInfo(accessToken);
      const check = await packageCondition(accInfo.portalID); 
      
      const User = await userModel.findOne({portalID : accInfo.portalID });
      console.log("User: ===========" + User.email);
      
      const paymentInfo = await paymentModel.findOne({email : User.email}).sort({ createdAt: -1 });
      console.log("UpaymentInfoser: ===========" + paymentInfo);
      
      if(paymentInfo && paymentInfo.status == "cancelled"){
        res.send("you have cancelled your subscription")
      }
      else if(check){
        await updateAPICount(accInfo.portalID);
        const formattedNumber = formatPhoneNumber(phoneNumber, country, country_text);
        res.json({
          "outputFields": {
            "Formatted_Phone_Number": formattedNumber,
            "hs_execution_state": "SUCCESS"
          }
        });
      }else{
        res.json("Update your plan");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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