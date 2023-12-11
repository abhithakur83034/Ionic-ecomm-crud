const proreviewModel = require("../model/productReviewModel");

const addReview = async (req, res) => {
  //console.log(req.body);
  try {
    const review = await proreviewModel.insertMany(req.body);
    res.status(200).json({ review, status: "success" });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const showReview = async (req, res) => {
  try {
    const allReview = await proreviewModel.find(req.body);
    res.status(200).json({ allReview, status: "success" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const geteditProductReview = async (req, res) => {
    //console.log(req.body);
    const { itemId, userId, reviews } = req.body;
    try {
      const editReview = await proreviewModel.updateOne(
        { itemId, userId },
        { $set: {  review: reviews } } 
      );
  
      res.status(200).json({ editReview, status: "success" });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

module.exports = {
  addReview,
  showReview,
  geteditProductReview,
};
