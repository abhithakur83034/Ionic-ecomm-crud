const proreviewModel = require("../model/productReviewModel");

const addReview = async (req, res) => {
  console.log(req.body);
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

const like = async (req, res) => {
    console.log(req.body);
  const { itemId,reviewId, likedBy } = req.body;
  try {
    const existingPost = await proreviewModel.findOne({ itemId, _id : reviewId, likeBy : likedBy });
    console.log("existingPost",existingPost);
    if (existingPost) {
      await proreviewModel.findOneAndUpdate(
        { itemId,  _id :reviewId },
        { $pull: { likeBy: likedBy } },
        { new: true }
      );

      return res.status(200).json({
        message: `Disliked item with ID ${likedBy}`,
        status: "disliked",
      });
    }
  } catch (error) {
    res.status(500).send("Internal server error" + error);
  }


  const checkPost = await proreviewModel.findOne({ itemId, _id : reviewId});
console.log("checkPost",checkPost);
  if (checkPost) {
    const updatedPost = await proreviewModel.findByIdAndUpdate(
      checkPost._id,
      { $addToSet: { likeBy: likedBy } },
      { new: true }
    );

    if (updatedPost) {
      return res.status(200).json({ message: "Review liked", status: "liked" });
    } else {
      return res.status(404).json({ message: "Review not found" });
    }
  } else {
    try {
      const like = await proreviewModel.insertMany(req.body);
      return res.status(200).json({ like, status: "liked" });
    } catch (error) {
      res.status(500).send("Internal server error" + error);
    }
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
  like
};
