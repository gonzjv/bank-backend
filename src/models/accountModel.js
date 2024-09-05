import mongoose from 'mongoose'
import { transactionSchema } from './transactionModel.js';

const accountSchema = new mongoose.Schema({
    id: String,
    balance: Number,
    transactions: [transactionSchema]
});

const Account = mongoose.model('Account', accountSchema);

export {Account, accountSchema};