import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const indexHandler = asyncHandler(async (req,res,next) => {
    const user = await User.findOne({email: req.body.email}); 
    res.status(StatusCodes.OK).json(user);
  });
  
  const transactionHandler = asyncHandler(async (req,res,next) => {
    const user = req.body.user; 
    const receiver = await User.findOne({email: req.body.email}); 
    console.log("user.balance : ", user.account.balance);
    
    if (null == req.body.amount) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "Amount of money to transfer is NOT provided in request body"
      });
    } else if (null == receiver) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "There is not such a user to transfer money"
      });
    } else if(user.account.balance < req.body.amount){
      res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "There is not enough money"
      });
    } else {
      user.account.balance -= req.body.amount;
      receiver.account.balance += req.body.amount;
      const resultUser = await user.save();
      const resultReceiver = await receiver.save();
      console.log("resultUser:", resultUser);  
      console.log("resultReceiver:", resultReceiver);  
      res.status(StatusCodes.OK).json({balance: user.account.balance});
  };
});

export default {indexHandler, transactionHandler};
