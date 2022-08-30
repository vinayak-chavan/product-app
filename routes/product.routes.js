const express = require("express");

const { addProduct, viewProduct } = require("../controllers/product/productController");
const productValidation = require("../controllers/product/productValidator");
const { auth } = require("../middleware/auth");
const uploadFunction = require("../middleware/imageUpload");

const route = express.Router();

route.post("/product", productValidation, uploadFunction, auth, addProduct);
route.get("/product", auth, viewProduct);


module.exports = route;
