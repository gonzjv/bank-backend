import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js';
import { Account } from '../models/accountModel.js';

const JWT_SECRET_KEY = "the-most-secret-key";

const userSignUp = asyncHandler(async (req,res,next) => {
    const {email, password} = req.body;

    if (null == email || null == password) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send(
            "ERROR: both -email- and -password- should be provided"
        );
    } else if (null !== await User.findOne({email: email})) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send(
            "ERROR: user already esists"
        );
        next();
    } else {
        // use createDate on place of id
        // create collection in mongo to verify an email
        const newAccount = new Account({
            id: new Date().toISOString() + email,
            balance: Math.random() * 100
        });
        // ❌ hash password !!!
        const newUser = new User({
            email: email,
            password: password,
            account: newAccount
        });
        await newUser.save();

        res.status(StatusCodes.OK).json("SUCCESS: User registered!");
    }
});

const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email: email});
    console.log("User from db:", user);

    if(null !== user && user.password == password) {
        const payload = {
            email,
        };
        
        const token = jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        
        const userData = {
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