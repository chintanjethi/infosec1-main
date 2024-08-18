import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    api_url:{
        type: String,
        required: true
    },
    
})


export default mongoose.model("User", userSchema);