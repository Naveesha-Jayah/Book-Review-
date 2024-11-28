console.log("hello world");
//ieJsUI1iUZOXwNuB

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/ReviewRoute");


const app = express();

//Middleware
app.use(express.json());
app.use("/Reviews",router);


//DATABASE CONNECTION
mongoose.connect("mongodb+srv://admin:ieJsUI1iUZOXwNuB@cluster0.g7bx1.mongodb.net/")
.then(() => console.log("Connected to DB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log(err));

