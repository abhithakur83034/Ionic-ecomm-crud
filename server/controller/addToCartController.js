const { default: Error } = require("next/error");
const addToCartModel = require("../model/addToCartModel");
const successPayModel = require("../model/successPayModel");

const AddToCart = async (req, res) => {
  // console.log("from cart",req.body);

  try {
    const { image, name, price, quality,quantity, description,userId,itemId:_id } = req.body;
    // const image = req.file.filename;

    const existingItem = await addToCartModel.findOne({ userId, itemId:_id });
    // console.log("fdf",existingItem)
    if (existingItem) {
      const responseData = {
        message: "Product already in cart",
        status: "warning",
      };

      res.status(201).json(responseData);
    } else {
        const allPro = { image, name, price, quality,quantity, description,userId, itemId:_id };


      // console.log("cartData",cartData);

      const cart = new addToCartModel(allPro);
      await cart.save();

      const responseData = {
        message: "Product added to cart",
        status: "success",
      };

      res.status(201).json(responseData);
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal server error", status: "error" });
  }
};




const getAddToCart = async (req, res) => {
  try {
    const get = await addToCartModel.find(req.body);
    res.status(200).json({ get, status: "success" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};


const increment= async(req,res)=>{
    // console.log("increment",req.body);
    const {userId,itemId} = req.body;
    try {
      const existingItem = await addToCartModel.findOne({ userId, itemId });
      // console.log("fdf",existingItem)
      if (existingItem) {
        // If the item exists, increment the quantity field
        existingItem.quantity += 1;
        await existingItem.save();
  
        let responseData = {
          message: "Quantity incremented successfully",
          status: "success",
          updatedItem: existingItem,
          quantityAdded : 1
        };

  
        res.status(200).json(responseData);
      }
    } catch (error) {
        res.status(500).send("Internal server error");

    }
}



const decrement = async (req, res) => {
  // console.log("decrement", req.body);
  const { userId, itemId } = req.body;

  try {
    const existingItem = await addToCartModel.findOne({ userId, itemId });

    if (existingItem) {
      if (existingItem.quantity <= 1) {
        let delItem = await addToCartModel.deleteOne({itemId : itemId})
        return res.status(200).json({ message: delItem, status: "remove" });
      } else {
        // Decrease the quantity by 1 and save the updated item
        existingItem.quantity -= 1;
        await existingItem.save();
      }


      let responseData = {
        message: "Quantity decremented successfully",
        status: "success",
        updatedItem: existingItem,
        quantityREMOVED : 1
      };


      return res.status(200).json(responseData);
    }
  } catch (error) {
    // Handle any internal server error
    return res.status(500).send("Internal server error");
  }
};



const deleteCartProduct=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.params);
    try {
        const deletPro = await addToCartModel.deleteOne({userId : req.params.id})
        res.status(200).json({deletPro, status:"success"})
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}



clearAllCart=async(req,res)=>{
  // console.log("id",req.params);
  try {
  const clrcart = await addToCartModel.deleteMany({userId:req.params.id} )
    res.status(200).json({clrcart, status:"success"})
  } catch (error) {
    res.status(500).send(error)
  }
}



const makePayment = async (req, res) => {
  console.log(req.params);
  try {
    const finduser = await addToCartModel.find({ userId: req.params.id });
    console.log("findUser", finduser);
    
    const findTodel = await addToCartModel.deleteMany({ userId: req.params.id });
    console.log("findTotal", findTodel);

    // if (findTodel.acknowledged === true) {
    //   const saveUser = await successPayModel.insertMany(finduser);
    //   res.status(200).json({ saveUser, status: "success" });
    // } else {
      res.status(200).json({ message: findTodel, status: "success" });
    // }
  } catch (error) {
    res.status(500).send(error);
  }
};








module.exports = {
  AddToCart,
  getAddToCart,
  increment,
  decrement,
  deleteCartProduct,
  clearAllCart,
  makePayment
};
