const { async } = require("@firebase/util");
const firestore = require("firebase/firestore");
const db = require("../config/Firebase").db;
exports.Main = (req,res) => {
    res.render("index");
}
exports.map = (req,res) => {
    res.render("map");
}
exports.contactUS = (req,res) => {
    res.render("contactUS");
}
exports.aboutUs = (req,res) => {
    res.render("aboutUs");
}
exports.Login = (req,res) => {
    res.render("Login");
}
exports.Signup = (req,res) => {
    res.render("Signup");
}
exports.newUser = (req,res) => {
    res.render("Signup");
}
exports.Rate = (req,res) => {
    res.render("rate");
}
exports.state = (req,res) => {
    res.render("state");
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
exports.saveRevew =async (req,res) => {
    // console.log(doc);

    const review = req.body.val;
    const docRef = firestore.doc(db, "Rates", "reviews");
    const docSnap = await firestore.getDoc(docRef);
    if (docSnap.exists()) {
        let doc = docSnap.data();
        doc.reviews.push(review);
        doc.size++;
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