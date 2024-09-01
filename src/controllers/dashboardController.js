import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

const indexHandler = asyncHandler(async (req,res,next) => {
    res.status(StatusCodes.OK).json({balance: Math.random() * 1000});
  });

export default {indexHandler};
