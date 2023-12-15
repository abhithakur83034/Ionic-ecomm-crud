const mongoose = require('mongoose');
const likeMigration = require('../migration/likeMigration.json');
const LikeMigration = new mongoose.Schema(likeMigration);
module.exports = mongoose.model("likes",LikeMigration);