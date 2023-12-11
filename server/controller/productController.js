const productModel = require("../model/productModel");


//add api for add products===========================================================================================================
const AddPro = async (req, res) => {
  //console.log(req.file);
  //console.log(req.body);
  const { name, price, quality,quantity, description } = req.body;
  const image = req.file.filename;
  const allPro = { image, name, price, quality,quantity, description };
  try {
    const pro = await productModel.insertMany(allPro);
    res.status(200).json({ message: pro, status: "success" });
  } catch (error) {
    res.status(500).send("Intrnal server error");
  }
};


//get api for getting all prodicts==============================================================================================
const getAll = async (req, res) => {
  try {
    const getPro = await productModel.find(req.body);
    res.status(200).json({ message: getPro, status: "success" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};


//get api for getting single product for update===================================================================================
const updateProductGet = async (req, res) => {
  // //console.log(req.params);
  try {
    const singlePro = await productModel.findOne({ _id: req.params.id });
    // //console.log(singlePro);
    res.status(200).json({ singlePro, status: "getUser" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};


// put api for update=========================================================================================

const updateProductPut = async (req, res) => {
  //console.log("put req", req.body);
  //console.log("file", req.file);

  //console.log("id",req.params.id);

  try {
    const { name, price, quality, description } = req.body;
    const updateFields = { name, price, quality, description };

    if (req.file && req.file.filename) {
      updateFields.image = req.file.filename;
    }

    // Corrected the parameter to req.params.id
    const putPro = await productModel.updateOne(
      { _id: req.params.id },
      { $set: updateFields }
    );

    res.status(200).json({ putPro, status: "updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error", error);
  }
};


//delete api for deleting products======================================================================================

const deleteProduct = async (req, res) => {
  //console.log(req.params);
  try {
    const pro = await productModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ pro, status: "deleted" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  AddPro,
  getAll,
  updateProductGet,
  updateProductPut,
  deleteProduct,
};
