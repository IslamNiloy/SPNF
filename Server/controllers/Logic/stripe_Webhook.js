// stripeWebhook.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/* 
stripe listen --forward-to localhost:3003/stripe/webhook
 */
let STRIPE_DATA_DB = {};
let payment_DATA_DB = {};
const logger = require('../../utils/logger');
let { charge, update_Payment_Info } = require('../paymentController');
const { updateUserInfoAfterPayment } = require('../usercontroller');

const endpointSecret = process.env.webhookEndpoint;

let stripeWebhook = async (request, response) => {
  console.log("logging at webhook");
    const sig = request.headers[ 'stripe-signature' ];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);

            // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const checkout_session_completed_data = event.data.object;
        console.log("\t logging checkout.session.completed ");
        //console.log(checkout_session_completed_data);
        let custom_fields_array = checkout_session_completed_data.custom_fields;
        //console.log(custom_fields_array);
        STRIPE_DATA_DB.name = custom_fields_array[ 0 ].text.value;
        STRIPE_DATA_DB.companyName = custom_fields_array[ 1 ].text.value;
        STRIPE_DATA_DB.phoneNumber = custom_fields_array[ 2 ].text.value ? custom_fields_array[ 2 ].text.value : "";
        STRIPE_DATA_DB.email = checkout_session_completed_data.customer_details.email;
        STRIPE_DATA_DB.countryCode = checkout_session_completed_data.customer_details?.address?.country || '';
        console.log("logging STRIPE_DATA_DB");
        console.log(STRIPE_DATA_DB);
        break;
      case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
         /*  console.log("\t logging payment_intent.succeeded");
          console.log(paymentIntentSucceeded); */
          break;
      case 'charge.succeeded':
        
        const chargeSucceeded = event.data.object;
        console.log("\t logging charge.succeed EVENT"+ JSON.stringify(chargeSucceeded));
          console.log(chargeSucceeded.amount);
        payment_DATA_DB.email = chargeSucceeded.billing_details.email;
        payment_DATA_DB.name = chargeSucceeded.billing_details.name;
        payment_DATA_DB.phoneNumber = chargeSucceeded.billing_details.phoneNumber;
        payment_DATA_DB.chargeId = chargeSucceeded.id;
        payment_DATA_DB.amount = Number(chargeSucceeded.amount/100); //convert from cents
        payment_DATA_DB.currency = chargeSucceeded.currency;
        payment_DATA_DB.customer_id = chargeSucceeded.customer;
        payment_DATA_DB.invoice_id = chargeSucceeded.invoice;
        payment_DATA_DB.payment_method_details = chargeSucceeded.payment_method_details;
        payment_DATA_DB.receipt_url = chargeSucceeded.receipt_url;
        payment_DATA_DB.status = chargeSucceeded.status;
        payment_DATA_DB.payment_intent_id = chargeSucceeded.payment_intent;
        payment_DATA_DB.payment_method_id = chargeSucceeded.payment_method;
        console.log("\t logging payment_DATA_DB111111112222");
        console.log("payment_DATA_DB222222222222==========="+JSON.stringify(payment_DATA_DB));
        
        const sessions = await stripe.checkout.sessions.list({
          limit: -1,
        });
        console.log("Session session session session============webhook sessions.data[0].metadata.packageId"+ JSON.stringify(sessions.data[0].metadata.packageId));
        console.log("Session session session session============webhook sessions.data[0].metadata.portalID"+ JSON.stringify(sessions.data[0].metadata.portalID));
        console.log("payment_DATA_DB===========" + payment_DATA_DB);
        console.log("payment_DATA_DB===========STRIPE_DATA_DB" + JSON.stringify(STRIPE_DATA_DB));
      
        await update_Payment_Info(payment_DATA_DB,sessions.data[0].metadata.packageId, sessions.data[0].metadata.portalID); //TO DATABASE IN MONGO
        //await charge(payment_DATA_DB); //TO DATABASE IN MONGO
        await updateUserInfoAfterPayment(sessions.data[0].metadata.portalID, payment_DATA_DB);
        break;
   // ... handle other event types
      default:
          console.log(`Unhandled event type ${event.type}`);
  }
// Return a 200 response to acknowledge receipt of the event
  response.send();
    } catch (err) {
        console.log(err.raw);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
};

module.exports = {
    stripeWebhook,
    STRIPE_DATA_DB
};