const mongoose = require('mongoose');
const addToCartMigration = require('../migration/addToCartMigration.json');
const AddToCartMigration = new mongoose.Schema(addToCartMigration);

module.exports = mongoose.model("AddToCart",AddToCartMigration);