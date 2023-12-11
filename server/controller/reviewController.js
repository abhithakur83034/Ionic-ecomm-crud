const reviewModel = require('../model/reviewModel');

const addReview=async(req,res)=>{
    //console.log(req.body);
    try {
        const review = await reviewModel.insertMany(req.body)
        res.status(200).json({review, status:"success"})
    } catch (error) {
        res.status(500).send("internal server error")
    }
}


const showReview=async(req,res)=>{
    try {
        const allReview = await reviewModel.find(req.body)
        res.status(200).json({allReview, status:"success"})
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}



module.exports={
    addReview,
    showReview,
}