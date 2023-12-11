const express = require('express');
const reviewController = require('../controller/reviewController');
const router = express.Router()


router.post('/addreview',reviewController.addReview);
router.get('/showreview',reviewController.showReview);

module.exports = router;
