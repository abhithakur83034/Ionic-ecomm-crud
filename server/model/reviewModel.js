const mongoose = require('mongoose');
const reviewMigration = require('../migration/reviewMigration.json');
const ReviewMigration = new mongoose.Schema(reviewMigration);
module.exports = mongoose.model("review",ReviewMigration);