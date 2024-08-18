import mongoose from "mongoose";


const dashSchema = new mongoose.Schema({
    api_url:{
        type: String,
    },
    vuln:{
        type: String,
    },
    status:{
        type: String,
    },
    description:{
        type: String,
    },
    solution:{
        type: String,
    },
    others:{
        type: String,
    },
    
})


export default mongoose.model("Dash", dashSchema);