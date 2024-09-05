import mongoose, { Schema } from 'mongoose'

const transactionSchema = new mongoose.Schema({
    date: String,
    from: {type: Schema.ObjectId, ref: "userSchema"},
    to: {type: Schema.ObjectId, ref: "userSchema"},
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export {Transaction, transactionSchema};