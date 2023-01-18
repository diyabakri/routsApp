const express = require("express");
const { Login } = require("../controllers/Login");
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const LoginController = require("../controllers/Login");
const SignupController = require("../controllers/Signup");

router.get("/" , (req,res)=>{res.status(200).send("shittt")});

router.get("/home" , HomeController.Main);

router.get("/Rate" , HomeController.Rate);

router.get("/map" , HomeController.map);

router.get("/contactUS" , HomeController.contactUS);

router.get("/aboutUs" , HomeController.aboutUs);

router.get("/Signup" , HomeController.Signup);

router.get("/state" , HomeController.state);

router.get("/stateData" , HomeController.getRates);

router.post("/rate" , HomeController.saveRate);

router.post("/Signup" , SignupController.CreatUser);

router.post("/Login" , LoginController.Login);

module.exports = router;