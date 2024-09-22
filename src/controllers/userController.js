import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js';
import { Account } from '../models/accountModel.js';
import crypto from 'node:crypto'
import nodemailer from 'nodemailer'
import 'dotenv/config'

const JWT_SECRET_KEY = "the-most-secret-key";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth : {
        user: process.env.EMAIL_ADDRESS, 
        pass: process.env.EMAIL_PASSWORD, 
    },
});

const sendConfirmationCode = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Confirmation code. Fair Bank",
        html: 
        `<b>
            Hello, dear!
        </b>
        <div>Your code is : ${code}</div>
        `,
    };
    console.log("transporter: ", transporter.options);

    return await transporter.sendMail(mailOptions);
};


const userSignUp = asyncHandler(async (req,res,next) => {
    const {email, name, password} = req.body;

    if (null == email || null == password) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json(
            "ERROR: both -email- and -password- should be provided"
        );
    }
    //  else if (null !== await User.findOne({email: email})) {
    //     res.status(StatusCodes.NOT_ACCEPTABLE).json(
    //         "ERROR: user already esists"
    //     );
    //     next();
    // } 
    else {
        // use createDate on place of id
        // create collection in mongo to verify an email
        const newAccount = new Account({
            id: new Date().toISOString() + email,
            balance: Math.random() * 100
        });
        // ❌ hash password !!!
        const newUser = new User({
            email: email,
            name: name,
            password: password,
            isVerified: false,
            verificationCode: crypto.randomUUID().slice(0,6),
            account: newAccount
        });
        console.log("new user:", newUser);

        await newUser.save();
        const info = await sendConfirmationCode(newUser.email, newUser.verificationCode);
        console.log("confirm response: ", info);

        res.status(StatusCodes.OK).json("SUCCESS: User registered and waits for email confirmation!");
    }
});

const userConfirm = asyncHandler(async (req,res,next) => {
    const {email, code} = req.body;
    
    if (null == email || null == code) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json(
            "ERROR: both -email- and -confirmation code- should be provided"
        );
    } else  {
        const user = await User.findOne({email: email});
        console.log ("FLAG      !!! user:", user);
        
        if (null == user) {
            res.status(StatusCodes.NOT_ACCEPTABLE).json(
                "ERROR: user doesnt esist"
            );
        } else if (user.verificationCode == code){
            user.isVerified = true;
            await user.save();
            res.status(StatusCodes.OK).json("SUCCESS: User verified!");
        } else {
            res.status(StatusCodes.NOT_ACCEPTABLE).json("ERROR: Verification code is not correct!");

        }
    } 
});

const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email: email});
    console.log("User from db:", user);
    if (null == user) {
        res.status(StatusCodes.UNAUTHORIZED).json("User doesnt exist");
    } else if (user.isVerified == false) {
        res.status(StatusCodes.UNAUTHORIZED).json("You need to verify an email, provided during sign up");
    } else if (user.password != password) {
        res.status(StatusCodes.UNAUTHORIZED).json("Password is not correct");
    } else {
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
    }
});

const logout = asyncHandler(async (req,res,next) => {

});


export default {userSignUp, userConfirm, login};