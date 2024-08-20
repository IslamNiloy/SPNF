//payment information of an user
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;


const PaymentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },//user_.id
  email: { type: String, required: true },
  chargeId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  customer_id: { type: String, required: true },
  invoice_id: { type: String, required: true },
  payment_method_details: { type: Object, required: true },
  receipt_url: { type: String, required: true },
  status: { type: String, required: true },
  portalID: { type: Number},
},
  {
    timestamps: true,
  });

module.exports = mongoose.model('Payment', PaymentSchema);