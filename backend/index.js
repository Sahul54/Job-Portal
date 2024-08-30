// const express = require('express') // old way
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import { connect } from "mongoose";
import connectDB from "./utils/db.js";
dotenv.config({});

const app = express();

// get request
app.get("/", (req,res) => {
    return res.status(200).json({
        message: "Mai Backend mai aa chuka hu",
        success: true
    })
})

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:5173', // Corrected URL
    credentials: true // Corrected case
}

app.use(cors(corsOptions));

// mongodb connect

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    connectDB();
});
