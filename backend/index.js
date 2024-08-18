import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
import route2 from "./routes/dashRoute.js";
import {spawnSync} from 'child_process'
import alert from '../../tp.json' assert {type: 'json'}
import axios from 'axios'
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("DB connected successfully");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));


export const addAlerts = async(req,res) => {
        
    const pythonProcess = await spawnSync('python3', [
        '/Users/chintanjethi/Desktop/Grid 6.0/tp.py',
        process.env.API_KEY,
        req,
        '/Users/chintanjethi/Desktop/Grid 6.0/tp.json'
    ]);
    console.log(pythonProcess.stdout?.toString()?.trim());

    for(let i=0;i<alert.length;i++) {
        let repo={}
        repo.api_url = alert[i].url;
        repo.vuln = alert[i].name;
        repo.status = alert[i].risk;
        repo.description = alert[i].description;
        repo.solution = alert[i].solution;
        repo.others=alert[i].other;
        console.log(repo);
        
        await axios.post("http://localhost:8000/board/report", repo)
        .then((response)=>{
        })
        .catch(error => console.log(error))
    }
}

app.use("/api", route);
app.use("/board", route2);