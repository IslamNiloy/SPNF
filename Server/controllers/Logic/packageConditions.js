const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../../auth/hubspotAuth');
const logger = require('../../utils/logger'); // Add logger
const User = require('../../model/user.model');
const Package = require('../../model/packages.model');
const Subscription = require('../../model/subscription.model');
const apiCallCache = new Map();
const checkPhoneNumberApiCallCache = new Map();

exports.updateAPICount = async (portalID) => {
    try {
      if (apiCallCache.has(portalID)) {
        const currentData = apiCallCache.get(portalID);
        apiCallCache.set(portalID, { apiCallCount: currentData.apiCallCount + 1 });
      } else {
        apiCallCache.set(portalID, { apiCallCount: 1 });
      }
    
      return apiCallCache;
    } catch (e) {
      console.error('Error in condition function:', e);
    }
  };

  exports.bulkPhoneNumberApiCallCount = async() =>{
    try{
      for (const [portalID, data] of apiCallCache.entries()) {
        logger.info(`From bulkApiCallCount 
                    Portal ID: ${portalID}, 
                    API Call Count: ${data.apiCallCount}`);

         // Find the user by portalID
        const user = await User.findOne({ portalID: portalID });
        logger.info("---------------------logging at bulkApiCallCount-------------------");
        if (!user) {
          logger.info('User not found in bulkApiCallCount');
          return;
        }
        
        // Find the subscription and update the apiCallCount
        const subscriptionInfoUpdate = await Subscription.findOneAndUpdate(
          { user: user._id },
          { $inc: { apiCallCount: data.apiCallCount, totalApiCallCount: data.apiCallCount} }, // Increment apiCallCount by 1 //total also increase
          { new: true, upsert: false }  // upsert: false ensures it won't create a new document
        );
    
        if (!subscriptionInfoUpdate) {
          logger.info('Subscription not found');
          return;
        }

        apiCallCache.delete(portalID);
      }
    }catch(error){
      console.error('Error in bulkApiCallCount function:', error);
    }
  }


  /*  
    check phone number API checking codingtion starts
  */

    exports.bulk_Check_PhoneNumberApiCallCount = async() =>{
      try{
        for (const [portalID, data] of checkPhoneNumberApiCallCache.entries()) {
          logger.info(`From bulkApiCallCount for checkPhone No
                      Portal ID: ${portalID}, 
                      API Call Count: ${data.apiCallCount}`);

            // Find the user by portalID
            // logger.info("---------------------logging at CheckPhoneNumberUpdateAPICount start-------------------");
            // logger.info("Portal id: "+ portalID);
            const user = await User.findOne({ portalID: portalID });
            // logger.info("---------------------logging at CheckPhoneNumberUpdateAPICount update API Count end-------------------");
            if (!user) {
              logger.info('User not found in updateAPICount');
              return;
            }
            
            // Find the subscription and update the apiCallCount
            const subscriptionInfoUpdate = await Subscription.findOneAndUpdate(
              { user: user._id },
              { $inc: { checkPhoneNumberApiCallCount: data.apiCallCount , checkPhoneNumberTotalApiCallCount: data.apiCallCount} }, // Increment apiCallCount by 1 //total also increase
              { new: true, upsert: false }  // upsert: false ensures it won't create a new document
            );
        
            if (!subscriptionInfoUpdate) {
              logger.info('Subscription not found');
              return;
            }
          checkPhoneNumberApiCallCache.delete(portalID);
        }
      }catch(error){
        console.error('Error in bulkApiCallCount function:', error);
      }
    }

    exports.CheckPhoneNumberUpdateAPICount = async (portalID) => {
      try {
        if (checkPhoneNumberApiCallCache.has(portalID)) {
          const currentDataOfcheckPhoneNumberApiCallCache = checkPhoneNumberApiCallCache.get(portalID);
          checkPhoneNumberApiCallCache.set(portalID, { apiCallCount: currentDataOfcheckPhoneNumberApiCallCache.apiCallCount + 1 });
        } else {
          checkPhoneNumberApiCallCache.set(portalID, { apiCallCount: 1 });
        }
      
        return checkPhoneNumberApiCallCache;
      } catch (e) {
        console.error('Error in condition function:', e);
      }
    };
  

  
  exports.packageCondition = async (portalID) => {
    try{
      logger.info("At packageCondition");
      const user = await User.findOne( {portalID: portalID});
      // logger.info("At packageCondition user infos: "+ user);
      if (!user) {
        // Handle case where user is not found
        logger.info("At packageCondition User not found for portalID: " + portalID);
        return false;
      }
      //this user's subscription subscription
      const subscription = await Subscription.findOne( {user: user._id});
      logger.info("At packageCondition subscription infos: "+ subscription);
      //This user's package
      const user_package = await Package.findOne( {_id: subscription.package});
      const today = new Date();
      if (today >  (subscription.packageEndDate)) {
        logger.info("At packageCondition returning false date condition: "+ today + " "+ subscription.packageEndDate);
        return false;
      }
      logger.info("-----At packageCondition subscription.apiCallCount-----" + subscription.apiCallCount);
      logger.info("-----At packageCondition user_package.Limit-----" + user_package.Limit);

      let totalAPICALLS = 0;
      if (apiCallCache.size === 0 && checkPhoneNumberApiCallCache.size === 0) {
        totalAPICALLS = parseInt(subscription.apiCallCount) + parseInt(subscription.checkPhoneNumberApiCallCount);
      }else{
        if(apiCallCache.get(portalID) && !checkPhoneNumberApiCallCache.get(portalID)){
          const currentData = apiCallCache.get(portalID);
          totalAPICALLS = parseInt(subscription.apiCallCount) + 
                          parseInt(subscription.checkPhoneNumberApiCallCount) + 
                          parseInt(currentData.apiCallCount);
        }else if(checkPhoneNumberApiCallCache.get(portalID) && !apiCallCache.get(portalID)){
          const currentData = checkPhoneNumberApiCallCache.get(portalID);
          totalAPICALLS = parseInt(subscription.apiCallCount) + 
                          parseInt(subscription.checkPhoneNumberApiCallCount) + 
                          parseInt(currentData.apiCallCount);
        }else if(apiCallCache.get(portalID) && checkPhoneNumberApiCallCache.get(portalID)){
          const currentDataofApiCallCache = apiCallCache.get(portalID);
          const currentData_checkPhoneNumberApiCallCache = checkPhoneNumberApiCallCache.get(portalID);
          totalAPICALLS = parseInt(subscription.apiCallCount) + 
                          parseInt(subscription.checkPhoneNumberApiCallCount) + 
                          parseInt(currentDataofApiCallCache.apiCallCount)+
                          parseInt(currentData_checkPhoneNumberApiCallCache.apiCallCount);
        }else{
          totalAPICALLS = parseInt(subscription.apiCallCount) + parseInt(subscription.checkPhoneNumberApiCallCount);
        }
      }
      logger.info("====totalAPICALLS in package Condition===" + totalAPICALLS);
      let returningValue = {};
      if(totalAPICALLS < user_package.Limit){
        //return portalId, totalAPICALLS , user_package.Limit and canPass: true
        returningValue = {"portalId" : portalID, 
                          "totalAPICALLS" : totalAPICALLS, 
                          "userLimit": user_package.Limit, 
                          "canPass": true}; 
        return returningValue;
      }else{
        returningValue = {"portalId" : portalID, 
          "totalAPICALLS" : totalAPICALLS, 
          "userLimit": user_package.Limit, 
          "canPass": false}; 
        return returningValue;      //return portalId, totalAPICALLS , user_package.Limit and canPass: false
      }
    }catch (e) {
      logger.error("error in condition function: " + e);
    }
  }  
  /*  
    check phone number API checking condition ends
  */
  