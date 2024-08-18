import express from "express";
import { getAllapi,createReport } from "../controller/dashController.js";

const route2 = express.Router();

route2.get("/getapi", getAllapi);
route2.post("/report",createReport)


export default route2;