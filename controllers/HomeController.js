const { async } = require("@firebase/util");
const firestore = require("firebase/firestore");
const FS = require("fs");
const db = require("../config/Firebase").db;
exports.Main = (req,res) => {
    FS.readFile("./views/index.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    })// res.render("map");
}
exports.map = (req,res) => {
    FS.readFile("./views/map.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    })// res.render("map");
}
exports.contactUS = (req,res) => {
   FS.readFile("./views/contactUS.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    }) // res.render("contactUS");
}
exports.aboutUs = (req,res) => {
   FS.readFile("./views/aboutUs.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    }) // res.render("aboutUs");
}
exports.Login = (req,res) => {
    FS.readFile("./views/Login.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    })
}
exports.Signup = (req,res) => {
    FS.readFile("./views/Signup.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    })
    // res.render("Signup");
}
exports.newUser = (req,res) => {
    FS.readFile("./views/Signup.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    })
    // res.render("Signup");
}
exports.Rate = (req,res) => {
    FS.readFile("./views/rate.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    })
    // res.render("rate");
}
exports.state = (req,res) => {
   FS.readFile("./views/state.html","utf8",(err,html)=>{
        
        res.status(200).send(html);
    })
    // res.render("state");
}
exports.saveRate =async (req,res) => {

    index = req.body.val;
    const docRef = firestore.doc(db, "Rates", "Rate");
    const docSnap = await firestore.getDoc(docRef);
    if (docSnap.exists()) {
        let doc = docSnap.data();
        doc[index]++;
        await firestore.setDoc(docRef,doc);
        res.status(200).send("done");
    } else {
  // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
exports.getRates =async (req,res) => {

    const docRef = firestore.doc(db, "Rates", "Rate");
    const docSnap = await firestore.getDoc(docRef);
    if (docSnap.exists()) {
        let doc = docSnap.data();
        res.status(200).send(doc);
    } else {
  // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}