const express = require("express");
require("dotenv").config();
const connectDB = require("./")
const data = require('./mock-data.json');

const app = express();


const port = 3000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }
};


start();




