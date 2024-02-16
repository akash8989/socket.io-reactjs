import express from "express";
const router = express.Router();

router.get("/", (req,res)=>{
    res.send({response : "server is up and running."}).status(200)
})