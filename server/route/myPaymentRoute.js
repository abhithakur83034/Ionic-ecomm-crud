const express = require('express');
const myPaymentController = require('../controller/myPaymentController');
const router = express.Router()


router.post('/payment',myPaymentController.savePayment);
router.get('/showcard',myPaymentController.showCard);
router.post('/checkuser',myPaymentController.checkUser);

module.exports = router;
