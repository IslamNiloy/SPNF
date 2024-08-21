const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../model/payment.model');
const logger = require('../utils/logger'); // Add logger
const axios = require('axios');
const packagesModel = require('../model/packages.model');
const userModel = require('../model/user.model');
const subscriptionModel = require('../model/subscription.model');

//Code Stripe main start
exports.createCheckoutSession = async (req, res) => {
  logger.info("logging at /package/createCheckoutSession ");
  const selectedPackage = await packagesModel.findOne({_id: req.params.id}); //getting information from mongodb packageModel
  const stripePrices = await stripe.prices.list(); //getting all price information from stripe
  const filteredStripePrice = stripePrices.data.filter(priceObj =>parseInt(priceObj.unit_amount) === parseInt((selectedPackage.price) * 100));;//filtering from stripe data with price of packageModel findOne

  //const product = Product_Array.find(product => product.package_id == req.params.id);
  try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: filteredStripePrice[0].id,
            quantity: 1,
          },
        ],
        custom_fields: [
          {
            key: 'name',
            label: {
              type: 'custom',
              custom: 'Full Name',
            },
            type: 'text',
          },
          {
            key: 'company',
            label: {
              type: 'custom',
              custom: 'Company Name',
            },
            type: 'text',
          },
          {
            key: 'phone',
            label: {
              type: 'custom',
              custom: 'Phone Number',
            },
            type: 'text',
            optional: true,
          },
        ],
        mode: (req.params.id === '66ba2cf16343bea38ef334ba') ? 'payment' : 'subscription',
        success_url: `${process.env.SUCCESS_URL_STRIPE}`,
        cancel_url: `${process.env.CANCEL_URL_STRIPE}`,
      });
    if(req.params.id === '66ba2cf16343bea38ef334ba'){
      await zeroDollarInfo(session);
    }
      //this.charge(session.id, mainProduct.price);
    logger.info("-------Session whole -----------" + JSON.stringify(session));
    
   res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
  }
}
//code stripe main ends


exports.charge = async (charge_data) => {
try{
  logger.info("--------ChargeID in charge paymentController111111111---------" + charge_data);
  /*
    1. find all payments history from mongoDB of email ID
    2. if found, set status to cancelled
    3. cancel stripe subscription as well using the email address
  */
  const paymentInfoByEmail = await PaymentModel.findOne({email: charge_data.email}).sort({ createdAt: -1 });
  logger.info("---paymentInfoByEmail in charge function---" + paymentInfoByEmail);
  if(paymentInfoByEmail){
    const paymentInfoUpdate = await PaymentModel.findOneAndUpdate(
      { email: charge_data.email},
      { $set:
          {
            status: "cancelled", 
          },
          
      },
      { new: true } 
    );
    logger.info("All previous Subscriptions has been cancelled for user: "+ charge_data.email+ "paymentInfoUpdate: "+ paymentInfoUpdate);
    logger.info("Calling ${BACKEND_URL}/charge/cancel/${charge_data.email} in charge function");
    //next subscription cancel in stripe
    await axios.get(`${process.env.BACKEND_URL}/charge/cancel/${charge_data.email}`);
  }
  global.stripeEmail = charge_data.email;
  /*
  const transaction = new PaymentModel(
    charge_data
  );
    await transaction.save();
    */
    logger.info("Payment info saved with global.stripeEmail ===== " + global.stripeEmail)
  } catch (error) {
    logger.info("error in Charge function in paymentController: " + error)
  }
};

exports.cancel_subscription = async(req,res) =>{
  try{
    //should get the invoice number
    const paymentInfo = await PaymentModel.findOne({ email: req.params.email }).sort({ createdAt: -1 })
    if(!paymentInfo){
      res.send("Payment information not found!");
    }
    const chargeInfo = await stripe.invoices.retrieve(paymentInfo.invoice_id);
    const subscriptionCancel = await stripe.subscriptions.cancel(chargeInfo.subscription);
    logger.info("------------cancel_subscription paymentInfo-----------"+paymentInfo);
    logger.info("------------cancel_subscription subscriptionCancel-----------"+subscriptionCancel);
    logger.info("------------cancel_subscription chargeInfo-----------"+chargeInfo);
    await updatePaymentSuccessCancel(req,res,paymentInfo._id);
    res.send(subscriptionCancel);
  }catch(error){
    logger.info("----------error in cancelling subscription------------"+ error)
    res.send("Something went wrong!")
  }
}


exports.update_Payment_Info = async (userData) => {
  console.log("Logging at /update_Payment_Info: " + userData);
  try {
    const payment_Info = await PaymentModel.findOne({ email: userData.email });
    if (!payment_Info) {
      return { error: 'Payment Info not found' };
    }
  const paymentUpdate = await PaymentModel.findOneAndUpdate(
      { email: userData.email },
      {
        $set: {
          user: userData._id,
          portalID: userData.portalID,
        },
    },
    { new: true, upsert: false }
    );
    console.log(paymentUpdate);
    return paymentUpdate;
  } catch (error) {
    console.error('Error in update_Payment_Info:', error);
    return  error ;
  }
};


const zeroDollarInfo = async(session) =>{
  try{
    const transaction = new PaymentModel(
      {
        "email":"Update Your Plan",
        "chargeId": session.id,
        "amount": 0,
        "currency" :"usd",
        "customer_id": "Update Your Plan",
        "invoice_id": "Update Your Plan",
        "payment_method_details": {"details": "update your plan"},
        "receipt_url": "update your plan",
        "status": "Free package"
      }
    );
      await transaction.save();
  }catch (error){
    console.log(error);
  }
}

exports.get_payment_info_user = async (req,res) => {
  logger.info("Logging at /get_payment_info_user");
  try{
    const payment_Info = await PaymentModel.findOne({ email:req.params.email }).sort({ createdAt: -1 });
    res.json((payment_Info));
  }catch (error){
    res.send(error);
  }
}

const updatePaymentSuccessCancel = async (req,res, id) => {
  logger.info("Logging at /updatePaymentSuccess");
  try {
    const payment_Info = await PaymentModel.findOne({ _id: id });
    if (!payment_Info) {
      return { error: 'Payment Info not found' };
    }
  const paymentUpdateCancel = await PaymentModel.findOneAndUpdate(
      { _id: id},
      {
        $set: {
          status: "cancelled",
        },
    },
    { new: true, upsert: false }
    );
    logger.info("----------paymentUpdateCancel-----------"+ paymentUpdateCancel);
    return paymentUpdateCancel;
  } catch (error) {
    console.error('Error in update_Payment_Info:', error);
    return  error ;
  }
}

//charging free user if remained
/*
exports.chargeRemainedFree = async (req, res) =>{
  try{
    const apiCallCount = req.params.apiCallCount;
    const portalID = req.params.portalID;

    const userInfo = await userModel.findOne({portalID:portalID});
    const findFreePackage = await packagesModel.findOne({packageName: "Free"});
  
    await subscriptionModel.findOneAndUpdate(
      { user: userInfo._id},
      { $set:
          {
              apiCallCount: 0,
              package: findFreePackage._id,

          },
          
      },
      { new: true } 
    );
    res.redirect (`${process.env.FRONTEND_URL}/profile`)
  }catch (error){
    res.send("Error in chargeRemainedFree: " + error)
  }
}
  */