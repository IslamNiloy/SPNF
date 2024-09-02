const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../../auth/hubspotAuth');
const logger = require('../../utils/logger'); // Add logger
const User = require('../../model/user.model');
const Package = require('../../model/packages.model');
const Subscription = require('../../model/subscription.model');
const { getCacheData } = require('./bulkCountInsertion');
  

  exports.packageCondition = async (portalID) => {
    try{
      logger.info("At packageCondition");
      let totalAPICALLS = 0;
      const cacheData = getCacheData();
      console.log('cacheData in package condition::' + JSON.stringify(cacheData));
      logger.info('cacheData in package condition::' + JSON.stringify(cacheData));
      const existingEntryInCache = cacheData.find(entry => entry.portalID === portalID);
      const user = await User.findOne( {portalID: portalID});
      logger.info("At packageCondition user infos: "+ user);
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
      if(existingEntryInCache){ //checking if 
         totalAPICALLS = parseInt(subscription.apiCallCount) + 
          parseInt(subscription.checkPhoneNumberApiCallCount) +
          parseInt(existingEntryInCache.countPhoneNumberApiCall) +
          parseInt(existingEntryInCache.countCheckPhoneNumber) 
      }else{
        totalAPICALLS = parseInt(subscription.apiCallCount) + 
        parseInt(subscription.checkPhoneNumberApiCallCount) 
      }
      
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

