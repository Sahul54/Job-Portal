import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("DB is connected is sucessfully.");
        
    }
    catch(error){
        console.log(error);
    }
}

export default connectDB;