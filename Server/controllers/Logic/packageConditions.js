const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../../auth/hubspotAuth');
const logger = require('../../utils/logger'); // Add logger
const User = require('../../model/user.model');
const Package = require('../../model/packages.model');
const Subscription = require('../../model/subscription.model');
const paymentModel = require('../../model/payment.model');
const apiCallCache = new Map();
// const checkphnNoCache = new Map();

const apiCheckCallCache = [];


exports.updateAPICount = async (portalID) => {
    try {
      if (apiCallCache.has(portalID)) {
        const currentData = apiCallCache.get(portalID);
        apiCallCache.set(portalID, { apiCallCount: currentData.apiCallCount + 1 });
      } else {
        apiCallCache.set(portalID, { apiCallCount: 1 });
      }

      for (const [portalID, data] of apiCallCache.entries()) {
        console.log(`From updateAPICount ===> 
                    Portal ID: ${portalID}, 
                    API Call Count: ${data.apiCallCount}`);
        }

      return apiCallCache;
    } catch (e) {
      console.error('Error in condition function:', e);
    }
  };

  exports.bulkPhoneNumberApiCallCount = async() =>{
    try{
      for (const [portalID, data] of apiCallCache.entries()) {
        console.log(`From bulkApiCallCount ===>
                    Portal ID: ${portalID}, 
                    API Call Count: ${data.apiCallCount}`);

         // Find the user by portalID
        const user = await User.findOne({ portalID: portalID });
        console.log("---------------------logging at bulkApiCallCount-------------------");
        if (!user) {
          console.log('User not found in bulkApiCallCount');
          return;
        }
        
        // Find the subscription and update the apiCallCount
        const subscriptionInfoUpdate = await Subscription.findOneAndUpdate(
          { user: user._id },
          { $inc: { apiCallCount: data.apiCallCount, totalApiCallCount: data.apiCallCount} }, // Increment apiCallCount by 1 //total also increase
          { new: true, upsert: false }  // upsert: false ensures it won't create a new document
        );
        console.log("subscriptionInfoUpdate in bulkPhoneNumberApiCallCount" + JSON.stringify(subscriptionInfoUpdate))
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

 
    
    exports.bulk_Check_PhoneNumberApiCallCount = async () => {
      try {
        // Loop through the array in reverse to safely remove items while iterating

        console.log("JSON.stringify(apiCheckCallCache) in cache head = " + JSON.stringify(apiCheckCallCache));
        for (let i = apiCheckCallCache.length - 1; i >= 0; i--) {
          const data = apiCheckCallCache[i];
          const portalID = data.portalId;

          console.log("JSON.stringify(apiCheckCallCache) in cache= " +portalID + " and data.apiCallCount = "+data.apiCallCount);
 
          // Fetch the user by portalID
          const user = await User.findOne({ portalID: portalID });
    
          if (!user) {
            logger.info(`User not found for portalID: ${portalID}`);
            continue; // Move to the next iteration if user is not found
          }
    
          // Update the subscription info with the apiCallCount value
          const subscriptionInfoUpdate = await Subscription.findOneAndUpdate(
            { user: user._id },
            {
              $inc: {
                checkPhoneNumberApiCallCount: data.apiCallCount, // Update with current apiCallCount
                checkPhoneNumberTotalApiCallCount: data.apiCallCount, // Update total API call count
              },
            },
            { new: true, upsert: false } // Do not create a new record if it doesn't exist
          );
    
          if (!subscriptionInfoUpdate) {
            logger.info(`Subscription not found for user: ${user._id}`);
            continue; // Move to the next iteration if the subscription is not found
          }
    
          // Remove the entry from the array after successfully updating the subscription
          apiCheckCallCache.splice(i, 1);
        }
      } catch (error) {
        console.error('Error in bulk_Check_PhoneNumberApiCallCount function:', error);
      }
    };     


    exports.CheckPhoneNumberUpdateAPICount = async (portalID) => {
      try {
        // Check if the portalId already exists in the cache
        const existingEntry = apiCheckCallCache.find(entry => entry.portalId === portalID);
    
        if (existingEntry) {
          // If it exists, increment the apiCallCount by 1
          existingEntry.apiCallCount += 1;
        } else {
          // If it doesn't exist, add a new entry to the cache
          const result = { portalId: portalID, apiCallCount: 1 };
          apiCheckCallCache.push(result);
        }

        console.log("JSON.stringify(apiCheckCallCache) in main= " +JSON.stringify(apiCheckCallCache) );
      } catch (e) {
        console.error('Error in CheckPhoneNumberUpdateAPICount function:', e);
      }
    };
    

  
  exports.packageCondition = async (portalID) => {
    try{
      let returningValue = {};
      logger.info("At packageCondition");
      const user = await User.findOne( {portalID: portalID});
      // logger.info("At packageCondition user infos: "+ user);
      if (!user) {
        // Handle case where user is not found
        logger.info("At packageCondition User not found for portalID: " + portalID);
         returningValue = {"portalId" : portalID, 
          "totalAPICALLS" : 0, 
          "userLimit": user_package.Limit, 
          "canPass": false}; 
        return returningValue;
      }
      //this user's subscription subscription
      const subscription = await Subscription.findOne( {user: user._id});

      const paymentInformation = await paymentModel.findOne({portalID:portalID})
      logger.info("At packageCondition subscription infos: "+ subscription);
      //This user's package
      const user_package = await Package.findOne( {_id: subscription.package});
      const today = new Date();
      /* 
        if today > endDate then checking
          if status == successed then update the value in subscription model the end date
          else status != successed then send the canPass to false
      */
      if(today >  (subscription.packageEndDate) && paymentInformation.status == "successed"){
          const SubscriptionUpdate = await Subscription.findOneAndUpdate(
            { user: user._id },
                {
                  $set: {
                    packageEndDate: today
                  }
              },
              { new: true, upsert: false }
            );
            logger.info("end date updated in package Condition: "+ SubscriptionUpdate);
      }else if (today >  (subscription.packageEndDate)  && paymentInformation.status != "successed") {
        logger.info("At packageCondition returning false date condition: "+ today + " "+ subscription.packageEndDate);
           returningValue = {"portalId" : portalID, 
            "totalAPICALLS" : 0, 
            "userLimit": user_package.Limit, 
            "canPass": false}; 
          return returningValue;
      }

      logger.info("-----At packageCondition subscription.apiCallCount-----" + subscription.apiCallCount);
      logger.info("-----At packageCondition user_package.Limit-----" + user_package.Limit);

      let totalAPICALLS = 0;

      totalAPICALLS = parseInt(subscription.apiCallCount) + parseInt(subscription.checkPhoneNumberApiCallCount);

      // // if (apiCallCache.size === 0) {
        
      // // }else{
      // //   // if(apiCallCache.get(portalID) && !checkphnNoCache.get(portalID)){
      // //   //   const currentData = apiCallCache.get(portalID);
      // //   //   totalAPICALLS = parseInt(subscription.apiCallCount) + 
      // //   //                   parseInt(subscription.checkPhoneNumberApiCallCount) + 
      // //   //                   parseInt(currentData.apiCallCount);
      // //   // }else if(checkphnNoCache.get(portalID) && !apiCallCache.get(portalID)){
      // //   //   const currentData = checkphnNoCache.get(portalID);
      // //   //   totalAPICALLS = parseInt(subscription.apiCallCount) + 
      // //   //                   parseInt(subscription.checkPhoneNumberApiCallCount) + 
      // //   //                   parseInt(currentData.apiCheckCallCount); //eikhane change hobe
      // //   // }else 
      // //   if(apiCallCache.get(portalID)){
      // //     const currentDataofApiCallCache = apiCallCache.get(portalID);
      
      // //     if(currentDataofApiCallCache.apiCheckCallCount > 0){
      // //       totalAPICALLS = parseInt(subscription.apiCallCount) + 
      // //       parseInt(subscription.checkPhoneNumberApiCallCount) + 
      // //       parseInt(currentDataofApiCallCache.apiCallCount)+
      // //       parseInt(currentDataofApiCallCache.apiCheckCallCount);
      // //     }else{
      // //       totalAPICALLS = parseInt(subscription.apiCallCount) + 
      // //       parseInt(subscription.checkPhoneNumberApiCallCount) + 
      // //       parseInt(currentDataofApiCallCache.apiCallCount)
      // //     }

     
      // //   }else{
      // //     totalAPICALLS = parseInt(subscription.apiCallCount) + parseInt(subscription.checkPhoneNumberApiCallCount);
      // //   }
      // }
      logger.info("====totalAPICALLS in package Condition===" + totalAPICALLS);
      
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
  