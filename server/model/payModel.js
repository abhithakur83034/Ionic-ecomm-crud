const mongoose = require('mongoose');
const payMigration = require('../migration/payMigration.json');
const PayMigration = new mongoose.Schema(payMigration);

module.exports = mongoose.model("success payment",PayMigration);