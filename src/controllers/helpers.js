import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const JWT_SECRET_KEY = "the-most-secret-key";

const checkToken = async (req,res,next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  console.log('token', token);

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'No token provided',
    });
  }

  const {email} = jwt.decode(token);
  const user =  await  User.findOne({email: email}); 
  req.body = {...req.body, user};
  
  return jwt.verify(token, JWT_SECRET_KEY, (err) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Failed to authenticate token',
      });
    }
    return next();
  });
};

export {checkToken};