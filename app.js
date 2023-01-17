const express = require("express");
const convert = require("xml-js");
const firebase = require("./config/Firebase");

app = express();
// Cofigrations
// const configVars = require("./config/Config"); 
// const connection = require("./config/DataBase");

const bp = require('body-parser');

// body-parser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
//use bootstrab and jquary files
app.use("/public",express.static(__dirname + '/public'));
app.use("/node_modules/jquery/dist/",express.static(__dirname + '/node_modules/jquery/dist/'));
app.use("/node_modules/bootstrap/dist/",express.static(__dirname + '/node_modules/bootstrap/dist/'));
// envrioment vars 
require("dotenv").config({path:"./vars.env"});

app.set("view engine" , "ejs");
app.set("views", "./views");

// connecting routers
// app.use('/login',require("./routes/Login"));
app.use('/',require("./routes/Home"));

// Hosting configrations
const PORT = process.env.PORT || 3000;
const HOST = "localhost";
// Start the server
app.listen(3000 , () => {
    // console.log(`server is up on ${HOST} : 80`);
})

