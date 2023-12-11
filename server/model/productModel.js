const mongoose = require('mongoose');
const productMigration = require('../migration/productMigration.json');
const ProductMigration = new mongoose.Schema(productMigration);

module.exports = mongoose.model("product",ProductMigration);