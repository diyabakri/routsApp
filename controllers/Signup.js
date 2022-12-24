const createUserWithEmailAndPassword = require("firebase/auth").createUserWithEmailAndPassword;
const authentication = require("../config/Firebase").auth;

exports.CreatUser = (req,res)=>{
    
  const email = req.body.email;
  const password = req.body.password;

  createUserWithEmailAndPassword(authentication, email, password)
  .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).send(user);
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(200).send(errorMessage);
  });
}