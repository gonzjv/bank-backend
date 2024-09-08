import mongoose from 'mongoose'
import { accountSchema } from './accountModel.js';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    phoneNumber: Number,
    account: accountSchema
});

const User = mongoose.model('User', userSchema);

export {User, userSchema};