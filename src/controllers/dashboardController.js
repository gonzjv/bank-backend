import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const indexHandler = asyncHandler(async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    const {email} = jwt.decode(token);
    const user = await User.findOne({email: email}); 

    console.log("user.email : ", email);
    console.log("user.balance : ", user.account.balance);
    res.status(StatusCodes.OK).json({balance: user.account.balance});
  });

export default {indexHandler};
