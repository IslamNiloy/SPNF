const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../../auth/hubspotAuth');
const logger = require('../../utils/logger'); // Add logger
const User = require('../../model/user.model');
const Package = require('../../model/packages.model');
const Subscription = require('../../model/subscription.model');
const Payment = require("../../model/payment.model");
const countBuffer = {};  // In-memory buffer to store increments per user
const FLUSH_INTERVAL = 5000;  // Flush buffer every 5 seconds

// Periodically flush buffer to database
setInterval(async () => {
    for (const [userId, counts] of Object.entries(countBuffer)) {
        try {
            await Subscription.findOneAndUpdate(
                { user: userId },
                { $inc: { apiCallCount: counts.apiCalls, totalApiCallCount: counts.totalApiCalls } },
                { new: true, upsert: false }
            );
            delete countBuffer[userId];  // Clear buffer for the user after updating
        } catch (error) {
            console.error(`Failed to update user ${userId}:`, error);
        }
    }
}, FLUSH_INTERVAL);

exports.updateAPICount = async (portalID) => {
    try {
        // Log start
        logger.info("---------------------logging at update API Count start-------------------");
        logger.info("Portal id: " + portalID);

        // Find user directly in Subscription, if possible, or find user ID from User model
        const user = await User.findOne({ portalID: portalID });
        if (!user) {
            console.log('User not found in updateAPICount');
            return;
        }

        // Buffer API count increments for the user
        if (!countBuffer[user._id]) {
            countBuffer[user._id] = { apiCalls: 0, totalApiCalls: 0 };
        }
        countBuffer[user._id].apiCalls += 1;
        countBuffer[user._id].totalApiCalls += 1;

        logger.info("---------------------logging at update API Count end-------------------");

    } catch (error) {
        console.error('Error in updateAPICount function:', error);
    }
};

  
  exports.packageCondition = async (portalID) => {
    try{
      console.log("at packageCondition");
      const user = await User.findOne( {portalID: portalID});
      const today = new Date();

      // logger.info("At packageCondition user infos: "+ user);
      if (!user) {
        // Handle case where user is not found
        return false;
      }
      //this user's subscription subscription
      const subscription = await Subscription.findOne( {user: user._id});
      //This user's package
      const user_package = await Package.findOne( {_id: subscription.package});
      const user_payment_info = await Payment.findOne({portalID: portalID});

      if(today >  (subscription.packageEndDate) 
        && (user_payment_info.status!='cancelled' || user_payment_info.status!='due')){
      console.log(`user package Name: ${user_package.packageName}`);
        if(user_package.packageName == "Free"){
          return false;
        }
        const updatedEndDate = new Date(today);

        if(user_package.duration == 30){;     
          updatedEndDate.setDate(today.getDate() + 30); //working as expected
        }
        if(user_package.duration == 365){
          updatedEndDate.setDate(today.getDate() + 365);//checking this
        }
        subscription.packageEndDate = updatedEndDate;        
        subscription.apiCallCount = 0; 
        subscription.checkPhoneNumberApiCallCount = 0;

        await subscription.save();
      }
      else if (today > (subscription.packageEndDate) && 
                        (user_payment_info.status=='cancelled' || user_payment_info.status=='due')) {
        return false;
      }

      if(user_payment_info.status=='cancelled'){
        console.log(user_payment_info.status);
        return false;
      }
      // if (today > (subscription.packageEndDate)) {
      //   return false;
      // }
      
      if(subscription && user_package){
        const totalAPICALLS = parseInt(subscription.apiCallCount) + parseInt(subscription.checkPhoneNumberApiCallCount)
        //console.log("Returning totalAPICALLS count:" + totalAPICALLS);
        if(totalAPICALLS < user_package.Limit){
          //console.log("Returning true when total API is:" + totalAPICALLS);
          return true;
        }else{
          //console.log("Returning false when total API is::" + totalAPICALLS);
          return false;
        }
      }else{
        console.log("Returning false due to subscription infor not found");
        return false;
      }
 
    }catch (e) {
      logger.error("error in condition function: " + e);
    }
  }


  /*  
    check phone number API checking codingtion starts
  */

    const phoneNumberCountBuffer = {};  // In-memory buffer for CheckPhoneNumberUpdateAPICount
    const PHONE_NUMBER_FLUSH_INTERVAL = 5000;  // Flush interval for CheckPhoneNumberUpdateAPICount
    
    // Periodically flush buffer to database for CheckPhoneNumberUpdateAPICount
    setInterval(async () => {
        for (const [userId, counts] of Object.entries(phoneNumberCountBuffer)) {
            try {
                await Subscription.findOneAndUpdate(
                    { user: userId },
                    { $inc: { checkPhoneNumberApiCallCount: counts.apiCalls, checkPhoneNumberTotalApiCallCount: counts.totalApiCalls } },
                    { new: true, upsert: false }
                );
                delete phoneNumberCountBuffer[userId];  // Clear buffer for the user after updating
            } catch (error) {
                console.error(`Failed to update user ${userId} in CheckPhoneNumberUpdateAPICount:`, error);
            }
        }
    }, PHONE_NUMBER_FLUSH_INTERVAL);
    
    exports.CheckPhoneNumberUpdateAPICount = async (portalID) => {
        try {
            // Find the user by portalID
            const user = await User.findOne({ portalID: portalID });
            if (!user) {
                console.log('User not found in CheckPhoneNumberUpdateAPICount');
                return;
            }
    
            // Buffer API count increments for the user
            if (!phoneNumberCountBuffer[user._id]) {
                phoneNumberCountBuffer[user._id] = { apiCalls: 0, totalApiCalls: 0 };
            }
            phoneNumberCountBuffer[user._id].apiCalls += 1;
            phoneNumberCountBuffer[user._id].totalApiCalls += 1;
    
        } catch (error) {
            console.error('Error in CheckPhoneNumberUpdateAPICount function:', error);
        }
    };
    
  
  /*  
    check phone number API checking condition ends
  */
  