// stripeWebhook.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/* 
stripe listen --forward-to localhost:3003/stripe/webhook
 */
let STRIPE_DATA_DB = {};
let payment_DATA_DB = {};
let { charge } = require('../paymentController');

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
        console.log("\t logging charge.succeed EVENT"+chargeSucceeded);
          console.log(chargeSucceeded.amount);
        payment_DATA_DB.email = chargeSucceeded.billing_details.email;
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
        console.log("\t logging payment_DATA_DB");
        console.log(payment_DATA_DB);
        await charge(payment_DATA_DB); //TO DATABASE IN MONGO
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