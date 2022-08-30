const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config()

const user = require('../../models/user');
const { successResponse, errorResponse } = require('../../utils');

const login = async (req, res) => {
  try {

    const emailID = req.body.emailID;
    const password = req.body.password;

    // check for email exist or not
    const userData = await user.findOne({ emailID: emailID });
    if (!userData) {
      return errorResponse(req, res, 'Invalid credentials.', 404);
    }

    // check for the password
    const isMatch = await bcrypt.compare(password, userData.password);
    if(!isMatch){
      return errorResponse(req, res, 'Invalid credentials.', 404);
    } else {

      // jwt token created
      let accessToken = userData.getToken({exp: 60*60, secret: process.env.SECRET});
      await userData.save();
      console.log('Login Successful');
      return res.status(200).send({ accessToken })
    }
  } catch (error) {
    return errorResponse(req, res, error.message, 400, { err: error });
  }
};

const register = async (req, res) => {
  try {

      // creading user payload
      const addinguserRecords = new user({
        username: req.body.username,
        emailID: req.body.emailID,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        designation: req.body.designation,
      });

      const emailID = req.body.emailID;

      // check if email id allready exist
      const userData = await user.findOne({ emailID: emailID });
      if (userData) {
        return errorResponse(req, res, 'email ID allready exist', 400);
      }
      else {

        // register new user
        const insert = await addinguserRecords.save();
        console.log('Registration Successful');
        return successResponse(req, res, insert, 200);
      }
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

module.exports = {  login, register };