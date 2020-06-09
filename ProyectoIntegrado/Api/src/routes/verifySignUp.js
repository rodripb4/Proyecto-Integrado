const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLES = config.ROLEs; 
const User = db.user;
const Role = db.role;
 
checkDuplicateUserNameOrEmail = (req, res, next) => {
  // -> Check Username is already in use
  console.log('buscando duplicados.')
  console.log(req.body)
  User.findOne({
    where: {
      username: req.body.username
    } 
  }).then(user => {
    if(user){
      res.status(400).send("Fail -> Username is already taken!");
      return;
    }
    
    // -> Check Email is already in use
    User.findOne({ 
      where: {
        email: req.body.email
      } 
    }).then(user => {
      if(user){
        res.status(400).send("Fail -> Email is already in use!");
        return;
      }
        
      next();
    });
  });
}
 
checkRolesExisted = (req, res, next) => { 
  console.log('estoy comprobando roles') 
  l_roles = req.body.roles
  console.log(l_roles)
  for(let i=0; i<l_roles.length; i++){
    if(!ROLES.includes(l_roles[i].toUpperCase())){
      res.status(400).send("Fail -> Does NOT exist Role = " + l_roles[i]);
      return;
    }
  }
  next();
}
 
const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;
 
module.exports = signUpVerify;