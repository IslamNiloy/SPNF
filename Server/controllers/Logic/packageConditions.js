const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../../auth/hubspotAuth');
const logger = require('../../utils/logger'); // Add logger
const User = require('../../model/user.model');
const Package = require('../../model/packages.model');
const Subscription = require('../../model/subscription.model');
  
  exports.updateAPICount = async (portalID) => {
    try {
      // Find the user by portalID
      logger.info("---------------------logging at update API Count start-------------------");
      logger.info("Portal id: "+ portalID);
      const user = await User.findOne({ portalID: portalID });
      logger.info("---------------------logging at update API Count end-------------------");
      if (!user) {
        console.log('User not found in updateAPICount');
        return;
      }
      
      // Find the subscription and update the apiCallCount
      const subscriptionInfoUpdate = await Subscription.findOneAndUpdate(
        { user: user._id },
        { $inc: { apiCallCount: 1, totalApiCallCount: 1} }, // Increment apiCallCount by 1 //total also increase
        { new: true, upsert: false }  // upsert: false ensures it won't create a new document
      );
  
      if (!subscriptionInfoUpdate) {
        console.log('Subscription not found');
        return;
      }
      
      console.log('Updated subscription:', subscriptionInfoUpdate);
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
      const totalAPICALLS = parseInt(subscription.apiCallCount) + parseInt(subscription.checkPhoneNumberApiCallCount)
      logger.info("====totalAPICALLS===" + totalAPICALLS);
      if(totalAPICALLS < user_package.Limit){
        return true;
      }else{
        return false;
      }
    }catch (e) {
      logger.error("error in condition function: " + e);
    }
  }


  /*  
    check phone number API checking codingtion starts
  */

    exports.CheckPhoneNumberUpdateAPICount = async (portalID) => {
      try {
        // Find the user by portalID
        // logger.info("---------------------logging at CheckPhoneNumberUpdateAPICount start-------------------");
        // logger.info("Portal id: "+ portalID);
        const user = await User.findOne({ portalID: portalID });
        // logger.info("---------------------logging at CheckPhoneNumberUpdateAPICount update API Count end-------------------");
        if (!user) {
          console.log('User not found in updateAPICount');
          return;
        }
        
        // Find the subscription and update the apiCallCount
        const subscriptionInfoUpdate = await Subscription.findOneAndUpdate(
          { user: user._id },
          { $inc: { checkPhoneNumberApiCallCount: 1 , checkPhoneNumberTotalApiCallCount: 1} }, // Increment apiCallCount by 1 //total also increase
          { new: true, upsert: false }  // upsert: false ensures it won't create a new document
        );
    
        if (!subscriptionInfoUpdate) {
          console.log('Subscription not found');
          return;
        }
        
        // console.log('Updated subscription:', subscriptionInfoUpdate);
      } catch (e) {
        console.error('Error in condition function:', e);
      }
    };
  
  
  /*  
    check phone number API checking condition ends
  */
  