import mongoose from 'mongoose'

const connectToMongo =  async () => {
    //for connection between docker containers
     await mongoose.connect("mongodb://mongodb:27017/bank");
    
    //for connection between local nodejs and containerized mongo 
    //await mongoose.connect("mongodb://localhost:27017/bank");
};

export {connectToMongo};