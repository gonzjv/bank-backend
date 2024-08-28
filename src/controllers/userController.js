import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

const userSignUp = asyncHandler(async (req,res,next) => {
    console.log("req.body", req.body);
    const userExist = false;
    
    if (true === userExist) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send("ERROR: user already esists")
    } else {
        res.status(StatusCodes.OK).send("SUCCESS: user registered")
    }
});

export default {userSignUp};