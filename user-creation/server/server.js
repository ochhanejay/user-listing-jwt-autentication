require("dotenv").config({ path: "./config.env" });
const express = require("express");

const app = require("./index");
const mongoose = require("mongoose");
const axios = require('axios');
const responseTime = require('response-time');
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Establishing database connection

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connection successful!"))
  .catch(() => console.log("Error connecting DB!"));

app.use(responseTime());


app.listen(9000, () => console.log("server is runnning at port 9000!"));


