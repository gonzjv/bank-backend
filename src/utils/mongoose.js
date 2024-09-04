import mongoose from 'mongoose'

const connectToMongo =  async () => {
    await mongoose.connect("mongodb://mongodb:27017/users");
};


const initDatabase =  async () => {
    const userSchema = new mongoose.Schema({
        email: String,
        password: String
    });
    
    const User = mongoose.model('User', userSchema);

    await User.createCollection();
    console.log("Created models:", mongoose.modelNames());
    console.log("Colections:", await mongoose.connection.listCollections());
};


export {connectToMongo, initDatabase};