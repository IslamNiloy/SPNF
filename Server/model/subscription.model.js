//there will be a new record for every user
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const SubscriptionSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        unique: true
    },
    package: {
        type: ObjectId,
        ref: 'Package',
    },
    apiCallCount: { type: Number },
    totalApiCallCount: { type: Number },
    joiningDate: { type: Date },
    packageStartDate: { type: Date },
    packageEndDate: { type: Date },
    apiCallLimit: { type: Number } //if custom
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Subscription', SubscriptionSchema);