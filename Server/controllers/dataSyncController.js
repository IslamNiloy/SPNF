const User = require('../model/user.model');
const Payment = require('../model/payment.model');
const Package = require('../model/packages.model');
const Subscription = require('../model/subscription.model');
const { Client } = require('@hubspot/api-client');
const logger = require('../utils/logger');


const hubspotClient = new Client({ accessToken: process.env.HS_API_KEY });

const syncDeal = async (subscription) => {
    // console.log("Pulling data from MongoDB");
    let contact_id;
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
      const bothApiCallCount = formattedApiCallCount + checkingApiCallCount
      // console.log(dealData)
      // console.log("___________-____email:",user.email)
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

      // console.log("search Response : " + JSON.stringify(searchResponse));
      contact_id = searchResponse?.results[0]?.id;
      if (searchResponse.total == 0) {
        // No contact found, so create a new contact
        const createResponse = await hubspotClient.crm.contacts.basicApi.create({
          properties: {
            email: user.email,
            firstname: user.name, 
            phone: user.phoneNumber
          },
        });
        contact_id = createResponse.id
        // console.log('New contact created:', createResponse.id);
      } else{
        const properties = {
          "firstname": user.name, 
        };
        const SimplePublicObjectInput = { objectWriteTraceId: "string", properties };
        const apiResponse = await hubspotClient.crm.contacts.basicApi.update(contact_id, SimplePublicObjectInput);
        // console.log(apiResponse)
      }
      // console.log('api call:',subscription.apiCallCount)
      const dealData = {
        properties: {
          dealname: `Phone Number formatter - ${user.uiDomain} - ${packageData.packageName}`,
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
          pf_remaining_api_limit: packageData.Limit -  bothApiCallCount,
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
          pf_company_domain: user.uiDomain || '',
          pf_api_call_count: formattedApiCallCount + checkingApiCallCount,
          pf_lifetime_api_call_count: lifetimeFormattedApiCallCount + lifetimeCheckingApiCallCount
        }
      };
      // console.log("---------------------- deal Data",dealData)
      // console.log("---------------------- deal Data",dealData)
    
      if (subscription.hubspotDealId) {
        await hubspotClient.crm.deals.basicApi.update(subscription.hubspotDealId, dealData);
        if (contact_id && subscription.hubspotDealId){
          associateContactToDeal( subscription.hubspotDealId, contact_id);
        }
        console.log(`Updated HubSpot deal for subscription ID: ${subscription._id}`);
        // logger.info(`Updated HubSpot deal for subscription ID: ${subscription._id}`);
      } else {

        const createResponse = await hubspotClient.crm.deals.basicApi.create(dealData);
        const hubspotDealId = createResponse.id;
        if (contact_id && hubspotDealId){
          associateContactToDeal(hubspotDealId,contact_id);
        }
  
        subscription.hubspotDealId = hubspotDealId;
        await subscription.save();
        console.log(`Created HubSpot deal for subscription ID: ${subscription._id}`);
        // logger.info(`Created HubSpot deal for subscription ID: ${subscription._id}`);
      }
    } catch (error) {
      console.error('Error syncing deal:', error);
      logger.info('Error syncing deal:', error);
    }
  };

const processStart = async() => {
    try {
      // console.log('start')
        const subscriptions = await Subscription.find().populate(['user','package']).exec();
        // console.log(subscriptions)
        for (const subscription of subscriptions) {
          await syncDeal(subscription);
        }
        console.log('Cron job completed: All subscriptions synced to HubSpot');
      } catch (error) {
        console.error('Error in cron job:', error);
        logger.info('Error in cron job:', error);
      }
}

// Function to associate a contact with a deal
// Function to associate a contact with a deal
const associateContactToDeal = async (objectId,toObjectId) => {
  try {
    const objectType = "deals";      
    // const objectId = "21783311998";  
    const toObjectType = "contacts"; 
    // const toObjectId = "66354473750"; 

    // Define the association spec
    const AssociationSpec = [
      {
        "associationCategory": "HUBSPOT_DEFINED",
        "associationTypeId": 3 
      }
    ];


  

    // Call the HubSpot API to create the association
    const apiResponse = await hubspotClient.crm.associations.v4.basicApi.create(objectType, objectId, toObjectType, toObjectId, AssociationSpec);
    
    // Log the API response
    // console.log("haskdj"+ JSON.stringify(apiResponse, null, 2));
  } catch (e) {
    // Handle errors
    if (e.message === 'HTTP request failed') {
      console.error(JSON.stringify(e.response, null, 2));
    } else {
      console.error(e);
    }
  }
};


module.exports = {processStart,syncDeal};