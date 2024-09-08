import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const getUser = async (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  const {email} = jwt.decode(token);
  
  return await  User.findOne({email: email}); 
};

const indexHandler = asyncHandler(async (req,res,next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader?.split(' ')[1];
    // const {email} = jwt.decode(token);
    const user = await getUser(req); 
    
    console.log("user.email : ", user.email);
    console.log("user.balance : ", user.account.balance);
    res.status(StatusCodes.OK).json({balance: user.account.balance});
  });
  
  const transactionHandler = asyncHandler(async (req,res,next) => {
    const user = await getUser(req);
    console.log("req.body : ", req.body);
    const receiver = await User.findOne({email: req.body.email}); 
    console.log("user.balance : ", user.account.balance);

    if (null == receiver) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "There is not such a user to transfer money"
      });
    } else {
      if (user.account.balance > req.body.amount) {
         
/*         const result = await User.updateOne({email: req.body.email}, account.balance:)
 */
        user.account.balance -= req.body.amount;
        const result = await user.save();
        console.log("decrease result:", result);  
      }
      res.status(StatusCodes.OK).json({balance: user.account.balance});
    };
  });

export default {indexHandler, transactionHandler};
