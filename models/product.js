const mongoose = require("mongoose");
const Schema = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const product = new mongoose.model("product", productSchema);

module.exports = product;
