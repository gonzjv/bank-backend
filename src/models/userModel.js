import mongoose from 'mongoose'
import { accountSchema } from './accountModel.js';

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    phoneNumber: Number,
    isVerified: Boolean,
    verificationCode: String,
    account: accountSchema
});

const User = mongoose.model('User', userSchema);

export {User, userSchema};