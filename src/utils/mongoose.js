import mongoose from 'mongoose'

const connectToMongo =  async () => {
    await mongoose.connect("mongodb://mongodb:27017/bank");
};

export {connectToMongo};