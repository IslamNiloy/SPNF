const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../../auth/hubspotAuth');
const logger = require('../../utils/logger'); // Add logger
const User = require('../../model/user.model');
const Package = require('../../model/packages.model');
const Subscription = require('../../model/subscription.model');

/*
export async function packageDetailsUpdate(req, res) {
    //later update if authenticate
    try{
      const portalID = req.body.portalID;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);
  
      const userInfoUpDate = await User.findOneAndUpdate(
        { portalID: portalID },
        { $set:
            {
              packageStartDate: startDate.toISOString().split('T')[0],
              packageEndDate:  endDate.toISOString().split('T')[0],
              package: req.body.package,
              apiCallCount: 0
            }
        },
        { new: true } 
      );
      if (!userInfoUpDate) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userInfoUpDate);
    }catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
  */
  
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
        { $inc: { apiCallCount: 1 , totalApiCallCount: 1} }, // Increment apiCallCount by 1 //total also increase
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
      if(subscription.apiCallCount < user_package.Limit){
        return true;
      }else{
        return false;
      }
      
      /*
      if((user.package == 'Free' && user.apiCallCount <= 500) || 
          (user.package == 'Pro' && user.apiCallCount <= 5000) ||
          (user.package == 'Enterprise' && user.apiCallCount <= 15000)||
          (user.package == 'Custom' && user.apiCallCount <= user.apiCallLimit)
        ){
          return true;
      }else{
        return false;
      }
     */
    }catch (e) {
      logger.error("error in condition function: " + e);
    }
  }
  