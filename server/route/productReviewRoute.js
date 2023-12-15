const express = require('express');
const reviewController = require('../controller/productReviewController');
const multer = require('multer');
const middleware = require('../middleware/middleware')
const router = express.Router();
// router.use('/img', express.static("./uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});


router.post('/addproreview',upload.single('image'),reviewController.addReview);
router.post('/likeproduct',upload.single('image'),reviewController.like);
router.get('/showproreview',reviewController.showReview);
router.put('/editproReview',reviewController.geteditProductReview)

module.exports = router;
