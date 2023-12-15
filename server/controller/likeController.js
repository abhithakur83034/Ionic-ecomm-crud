const likeModel = require("../model/likeModel");

// const like = async (req, res) => {
//   //   console.log(req.body);
//   const { itemId,reviewId, likedBy } = req.body;
//   try {
//     const existingPost = await likeModel.findOne({ itemId, reviewId, likedBy });
//     console.log("existingPost",existingPost);
//     if (existingPost) {
//       await likeModel.findOneAndUpdate(
//         { itemId, reviewId },
//         { $pull: { likedBy: likedBy } },
//         { new: true }
//       );

//       return res.status(200).json({
//         message: `Disliked item with ID ${likedBy}`,
//         status: "disliked",
//       });
//     }
//   } catch (error) {
//     res.status(500).send("Internal server error" + error);
//   }


//   const checkPost = await likeModel.findOne({ itemId,reviewId});
// console.log("checkPost",checkPost);
//   if (checkPost) {
//     const updatedPost = await likeModel.findByIdAndUpdate(
//       checkPost._id,
//       { $addToSet: { likedBy: likedBy } },
//       { new: true }
//     );

//     if (updatedPost) {
//       return res.status(200).json({ message: "Review liked", status: "liked" });
//     } else {
//       return res.status(404).json({ message: "Review not found" });
//     }
//   } else {
//     try {
//       const like = await likeModel.insertMany(req.body);
//       return res.status(200).json({ like, status: "liked" });
//     } catch (error) {
//       res.status(500).send("Internal server error" + error);
//     }
//   }
// };




const getReviewLikes = async (req, res) => {
  console.log(req.body);
  
  try {
      const getlikes = await likeModel.find(req.body)
      res.status(200).json({getlikes , status:"success"})
    } catch (error) {
    res.status(500).send("Internal server error" + error);
  }
};

module.exports = {
  // like,
  getReviewLikes,
};
