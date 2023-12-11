const mongoose = require('mongoose');
const successPayMigration = require('../migration/successPayMigration.json');
const SuccessPayMigration = new mongoose.Schema(successPayMigration);

module.exports = mongoose.model("SuccessPay",SuccessPayMigration);