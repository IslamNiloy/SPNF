const User = require('../model/user.model');
const Payment = require('../model/payment.model');
const Package = require('../model/packages.model');
const Subscription = require('../model/subscription.model');
const { Client } = require('@hubspot/api-client');
const logger = require('../utils/logger');


const hubspotClient = new Client({ accessToken: process.env.HS_API_KEY });

const syncDeal = async (subscription) => {
    console.log("Pulling data from MongoDB");
    try {
      const user = await User.findById(subscription.user);
      if (!user) {
        console.error(`User not found for subscription ID: ${subscription._id}`);
        logger.info(`User not found for subscription ID: ${subscription._id}`);
        return;
      }
  
      const packageData = await Package.findById(subscription.package);
      if (!packageData) {
        console.error(`Package not found for subscription ID: ${subscription._id}`);
        logger.info(`Package not found for subscription ID: ${subscription._id}`);
        return;
      }

      const payments = await Payment.find({user:subscription.user});
      if (payments.length === 0) {
        console.error(`No payments found for user: ${subscription.user}`);
        logger.info(`No payments found for user: ${subscription.user}`);
        return;
      }

      const payment = payments[0]
      let emailSet = new Set()
      if (payment.email) {
        emailSet.add(payment.email);
      }

      if (payment.previous_payment_details && payment.previous_payment_details.length > 0) {
          payment.previous_payment_details.forEach(previousPayment => {
              if (previousPayment.email) {
                  emailSet.add(previousPayment.email);
              }
          });
      }

      const paymentEmailList = Array.from(emailSet).join(', ') || ''; 
     
      const formattedApiCallCount = subscription.apiCallCount || 0;
      const checkingApiCallCount = subscription.checkPhoneNumberApiCallCount || 0;
      const lifetimeFormattedApiCallCount = subscription.totalApiCallCount || 0;
      const lifetimeCheckingApiCallCount = subscription.checkPhoneNumberTotalApiCallCount || 0;
 
      // console.log(dealData)
      const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
        filterGroups: [
          {
            filters: [
              {
                value: user.email,
                propertyName: 'email',
                operator: 'EQ',
              },
            ],
          },
        ],
        sorts: [],
        properties: [],
        limit: 1,
        after: 0,
      });

      if (searchResponse.total == 0) {
        // No contact found, so create a new contact
        const createResponse = await hubspotClient.crm.contacts.basicApi.create({
          properties: {
            email: user.email,
            firstname: user.name, 
            phone: user.phoneNumber
          },
        });
      
        console.log('New contact created:', createResponse.id);
      } 

        // Now define dealData
        const dealData = {
        properties: {
          dealname: `Phone Number formatter - ${packageData.packageName} - ${user.companyName}`,
          amount: payment.totalAmount || 0,
          dealstage: '727679696',
          pipeline: 'hs-eco-trx-pipeline',
          pf_user_name: user.name,
          pf_user_email: user.email,
          pf_user_company_name: user.companyName,
          pf_user_phone_number: user.phoneNumber,
          pf_portal_id: user.portalID,
          pf_account_type: user.accountType,
          pf_package_name: packageData.packageName,
          pf_package_price: packageData.price,
          pf_package_duration: packageData.duration,
          pf_package_limit: packageData.Limit,
          pf_remaining_api_limit: packageData.Limit - subscription.apiCallCount,
          pf_formatted_api_call_count: formattedApiCallCount,
          pf_lifetime_formatted_api_call_count: lifetimeFormattedApiCallCount,
          pf_checking_api_call_count: checkingApiCallCount,
          pf_lifetime_checking_api_call_count: lifetimeCheckingApiCallCount,
          pf_package_start_date: subscription.packageStartDate,
          pf_package_end_date: subscription.packageEndDate,
          pf_recent_payment_amount: payment.amount,
          pf_total_payment_amount: payment.totalAmount || 0,
          pf_payment_email_list: paymentEmailList || '',
          pf_subscription_status: payment.status,
          pf_api_call_count: formattedApiCallCount + checkingApiCallCount,
          pf_lifetime_api_call_count: lifetimeFormattedApiCallCount + lifetimeCheckingApiCallCount
        }
      };
    
      if (subscription.hubspotDealId) {
        await hubspotClient.crm.deals.basicApi.update(subscription.hubspotDealId, dealData);
        console.log(`Updated HubSpot deal for subscription ID: ${subscription._id}`);
        logger.info(`Updated HubSpot deal for subscription ID: ${subscription._id}`);
      } else {

        const createResponse = await hubspotClient.crm.deals.basicApi.create(dealData);
        const hubspotDealId = createResponse.id;
  
        subscription.hubspotDealId = hubspotDealId;
        await subscription.save();
        console.log(`Created HubSpot deal for subscription ID: ${subscription._id}`);
        logger.info(`Created HubSpot deal for subscription ID: ${subscription._id}`);
      }
    } catch (error) {
      console.error('Error syncing deal:', error);
      logger.info('Error syncing deal:', error);
    }
  };

const processStart = async() => {
    try {
        const subscriptions = await Subscription.find().populate(['user','package']).exec();
        // console.log(subscriptions)
        for (const subscription of subscriptions) {
          await syncDeal(subscription);
        }
        console.log('Cron job completed: All subscriptions synced to HubSpot');
        logger.info('Cron job completed: All subscriptions synced to HubSpot');
        logger.info('-------------------------------------------------------');
      } catch (error) {
        console.error('Error in cron job:', error);
        logger.info('Error in cron job:', error);
      }
}

module.exports = {processStart};