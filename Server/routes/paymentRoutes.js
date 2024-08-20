const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const webhookController = require('../controllers/Logic/stripe_Webhook');
const customUserController = require('../controllers/Logic/customUser');

router.post('/', paymentController.charge);
router.post('/create-checkout-session/:id', paymentController.createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), webhookController.stripeWebhook);
router.post('/custom/create', customUserController.customUserCreatePrice);
router.get('/cancel/:email', paymentController.cancel_subscription);
router.get('/get/info/:email', paymentController.get_payment_info_user);
//router.post('/free/remained/:apiCallCount/:portalID', paymentController.chargeRemainedFree);

module.exports = router;
