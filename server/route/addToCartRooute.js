const express = require('express');
const addToCartController = require('../controller/addToCartController');
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

router.post('/addtocart',upload.single("image"),addToCartController.AddToCart);
router.get("/allproduct",addToCartController.getAddToCart)
router.post('/increment',upload.single("image"),addToCartController.increment)
router.post('/decrement',addToCartController.decrement)
router.delete("/deleteproduct/:id",addToCartController.deleteCartProduct)
router.delete("/clearall/:id",addToCartController.clearAllCart)
router.delete("/makepayment/:id",addToCartController.makePayment)


module.exports=router