const { parsePhoneNumberFromString, AsYouType } = require('libphonenumber-js');
const countries = require('i18n-iso-countries');
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const logger = require('../utils/logger');
const userModel = require('../model/user.model');
const paymentModel = require('../model/payment.model');
const redisClient = require('./Logic/redisClient');

const DEFAULT_COUNTRY = 'US';
const MIN_PHONE_NUMBER_LENGTH = 7;
const MAX_PHONE_NUMBER_LENGTH = 15;

const getCountryCode = (country, country_text) => {
  //Our Existing code
};

const formatPhoneNumber = (phoneNumber, country, country_text) => {
  //Our Existing code
};

const incrementAPICount = (portalID) => {
  redisClient.incr(`apiUsage:${portalID}`, (err, reply) => {
    if (err) {
      console.error('Redis increment error:', err);
    }
  });
};

const flushAPICountsToDatabase = async () => {
  const keys = await redisClient.keys('apiUsage:*');
  
  for (const key of keys) {
    const portalID = key.split(':')[1];
    const count = await redisClient.get(key);
    
    await userModel.updateOne(
      { portalID },
      { $inc: { apiCallCount: parseInt(count) } }
    );

    // Remove the key from Redis after flushing
    redisClient.del(key);
  }
};

// Schedule this to run every hour
setInterval(flushAPICountsToDatabase, 60 * 60 * 1000);

exports.phoneNumber = async (req, res) => {
  const { phoneNumber, country, country_text } = req.body;
  logger.info(`--------logging at phoneNumber func with ${phoneNumber}, ${country}, ${country_text}-------`);
  try {
      const check = await packageCondition(req.body.portalID); 
      const User = await userModel.findOne({portalID: req.body.portalID });
      const paymentInfo = await paymentModel.findOne({portalID: req.body.portalID}).sort({ createdAt: -1 });

      if (paymentInfo && paymentInfo.status === "cancelled") {
        res.send("You have cancelled your subscription");
      } else if (check) {
        incrementAPICount(req.body.portalID);
        const formattedNumber = formatPhoneNumber(phoneNumber, country, country_text);
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

const checkPhoneNumber = (phoneNumber) => {
  //Our existing code
};

exports.checkPhoneNumber = async(req, res) => {
  const { phoneNumber } = req.body;
  try {
    const check = await packageCondition(req.body.portalID);
    const User = await userModel.findOne({portalID : req.body.portalID });
    const paymentInfo = await paymentModel.findOne({portalID: req.body.portalID}).sort({ createdAt: -1 });

    if (paymentInfo && paymentInfo.status === "cancelled") {
      res.send("You have cancelled your subscription");
    } else if (check) {
      incrementAPICount(req.body.portalID);
      if (!phoneNumber) {
        return res.status(200).json({
          "outputFields": {
            "Message": "Empty",
            "hs_execution_state": "SUCCESS"
          }
        });
      }

      const result = checkPhoneNumber(phoneNumber);

      return res.status(200).json({
        "outputFields": {
          "Message": result,
          "hs_execution_state": "SUCCESS"
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const { parsePhoneNumberFromString, AsYouType } = require('libphonenumber-js');
const countries = require('i18n-iso-countries');
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const logger = require('../utils/logger');
const userModel = require('../model/user.model');
const paymentModel = require('../model/payment.model');
const redisClient = require('./Logic/redisClient');

const DEFAULT_COUNTRY = 'US';
const MIN_PHONE_NUMBER_LENGTH = 7;
const MAX_PHONE_NUMBER_LENGTH = 15;

const getCountryCode = (country, country_text) => {
  //Our Existing code
};

const formatPhoneNumber = (phoneNumber, country, country_text) => {
  //Our Existing code
};

const incrementAPICount = (portalID) => {
  redisClient.incr(`apiUsage:${portalID}`, (err, reply) => {
    if (err) {
      console.error('Redis increment error:', err);
    }
  });
};

const flushAPICountsToDatabase = async () => {
  const keys = await redisClient.keys('apiUsage:*');
  
  for (const key of keys) {
    const portalID = key.split(':')[1];
    const count = await redisClient.get(key);
    
    await userModel.updateOne(
      { portalID },
      { $inc: { apiCallCount: parseInt(count) } }
    );

    // Remove the key from Redis after flushing
    redisClient.del(key);
  }
};

// Schedule this to run every hour
setInterval(flushAPICountsToDatabase, 60 * 60 * 1000);

exports.phoneNumber = async (req, res) => {
  const { phoneNumber, country, country_text } = req.body;
  logger.info(`--------logging at phoneNumber func with ${phoneNumber}, ${country}, ${country_text}-------`);
  try {
      const check = await packageCondition(req.body.portalID); 
      const User = await userModel.findOne({portalID: req.body.portalID });
      const paymentInfo = await paymentModel.findOne({portalID: req.body.portalID}).sort({ createdAt: -1 });

      if (paymentInfo && paymentInfo.status === "cancelled") {
        res.send("You have cancelled your subscription");
      } else if (check) {
        incrementAPICount(req.body.portalID);
        const formattedNumber = formatPhoneNumber(phoneNumber, country, country_text);
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

const checkPhoneNumber = (phoneNumber) => {
  //Our existing code
};

exports.checkPhoneNumber = async(req, res) => {
  const { phoneNumber } = req.body;
  try {
    const check = await packageCondition(req.body.portalID);
    const User = await userModel.findOne({portalID : req.body.portalID });
    const paymentInfo = await paymentModel.findOne({portalID: req.body.portalID}).sort({ createdAt: -1 });

    if (paymentInfo && paymentInfo.status === "cancelled") {
      res.send("You have cancelled your subscription");
    } else if (check) {
      incrementAPICount(req.body.portalID);
      if (!phoneNumber) {
        return res.status(200).json({
          "outputFields": {
            "Message": "Empty",
            "hs_execution_state": "SUCCESS"
          }
        });
      }

      const result = checkPhoneNumber(phoneNumber);

      return res.status(200).json({
        "outputFields": {
          "Message": result,
          "hs_execution_state": "SUCCESS"
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
