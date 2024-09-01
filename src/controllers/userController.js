import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'

const map = new Map();
const JWT_SECRET_KEY = "the-most-secret-key";

const userSignUp = asyncHandler(async (req,res,next) => {
    console.log("req.body", req.body);

    //  ❌  check email and pass in body !!!
    const {email, password} = req.body;
    const isUserExist = map.has(email);
    
    if (true === isUserExist) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send("ERROR: user already esists");
        next();
    } else {
        map.set(email, password);

        res.status(StatusCodes.OK).json("SUCCESS: User registered!");
    }
});

const login = asyncHandler(async (req, res, next) => {
    console.log("req.body", req.body);
    const {email, password} = req.body;

    if(map.has(email)) {
        const payload = {
            email,
            password
        };
        
        const token = jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        
        const userData = {
            email: email,
            token: token,
        };
        
        res.status(StatusCodes.OK).json(userData);
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json("Bad username/password combination");
    }
});

const logout = asyncHandler(async (req,res,next) => {

});

export default {userSignUp, login};