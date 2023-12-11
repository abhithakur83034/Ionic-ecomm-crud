const mongoose = require('mongoose');
const proreviewMigration = require('../migration/productReview.json');
const ProReviewMigration = new mongoose.Schema(proreviewMigration);
module.exports = mongoose.model("pro-review",ProReviewMigration);