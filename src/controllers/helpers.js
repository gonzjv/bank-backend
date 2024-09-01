import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = "the-most-secret-key";

const checkToken = (req,res,next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  console.log('token', token);

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'No token provided',
    });
  }

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

export default {checkToken};