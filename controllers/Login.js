const signInWithEmailAndPassword = require("firebase/auth").signInWithEmailAndPassword;
const auth = require("../config/Firebase").auth;
exports.Login=(req,res)=>{  
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  console.log(password)
  const param = {};
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      param.user = userCredential.user;

      res.status(200).send(param);
    })
    .catch((error) => {
      param.errorCode = error.code;
      param.errorMessage = error.message;
      res.status(200).send(error.message);
    });

}