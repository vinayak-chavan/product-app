const product = require("../../models/product");
const { successResponse, errorResponse } = require("../../utils");

const addProduct = async (req, res) => {
  try {

    // creating product payload
    const addingProduct = new product({
      name: req.body.name,
      photo: req.body.file,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      userID: req.user._id,
    });

    // adding new product
    const insert = await addingProduct.save();
    console.log('Product Added Successful');
    return successResponse(req, res, insert, 200);

  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const viewProduct = async (req, res) => {
  try {

    // finding product data as per logged in user
    const productData = await product.find({ userID: req.user._id });
    if (!productData) {
      return successResponse(req, res, "Not any product added yet", 200);
    } else {
      return successResponse(req, res, productData, 200);
    }

  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

module.exports = { addProduct, viewProduct };
