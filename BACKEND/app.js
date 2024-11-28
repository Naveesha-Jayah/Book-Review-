console.log("hello world");
//ieJsUI1iUZOXwNuB

const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Middleware
app.use("/",(req,res,next) => {
    res.send("It is working");
})

//DATABASE CONNECTION
mongoose.connect("mongodb+srv://admin:ieJsUI1iUZOXwNuB@cluster0.g7bx1.mongodb.net/")
.then(() => console.log("Connected to DB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log(err));

