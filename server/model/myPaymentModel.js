const mongoose = require('mongoose');
const myPaymentMigration = require('../migration/myPaymentMigration.json');
const MyPaymentMigration = new mongoose.Schema(myPaymentMigration);

module.exports = mongoose.model("MyPayment",MyPaymentMigration);