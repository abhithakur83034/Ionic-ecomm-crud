const express = require('express')
const currencyController = require('../controller/currencyController');

const router = express.Router()

router.get('/currency',currencyController.currency);

module.exports= router