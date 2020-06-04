const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
const Role = db.role;
const Responsable = db.responsable
const Solicitudes = db.soliictues
const ItemsSolicitud = db.items_solicitud
const Op = db.Sequelize.Op;
const mySQLConn = require('../database')
 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.signup = (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  console.log('En el signup')
  
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(user => {
    Role.findAll({
      where: {
      name: {
        [Op.or]: JSON.parse(req.body.roles)
      }
      }
    }).then(roles => {
      user.setRoles(roles).then(() => {
        res.send("User registered successfully!");
            });
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    });
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  })
}
 
exports.signin = (req, res) => {
  console.log("Sign-In");
  
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send('User Not Found.');
    }
 
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    res.status(200).send({ auth: true, accessToken: token });
    
  }).catch(err => {
    res.status(500).send('Error -> ' + err);
  });
}
 
exports.userContent = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}

exports.getResponsables = (req, res) =>{
  Responsable.findAll({
    attributes:['idEmpleado','dniEmpleados','nombreEmpleado','codEmpleado','email','nombreDepartamento']
  }).then(resp =>{    
    res.status(200).json({
      "resp":resp
    })
  })
}

exports.setSolicitud = (req, res)=>{
  mySQLConn.query(' call CrearSolicitud(?,?)',[req.body.responsable, req.body.cod_presup],
  (err, rows, fields)=>{
    res.status(200).json({
      "id_solicitud":rows[0][0]["crear_solicitud(p_id_responsable, p_cod_presup)"]
    })    
  }
  )
}

exports.setSolicitudItem = (req, res) =>{
  mySQLConn.query('call crear_item_solicitud(?,?,?)',[req.body.id_sol, req.body.id_bien, req.body.qnt],
   (err, rows, fields)=>{
     console.log(err)
     console.log(fields)
     res.status(200).json({
       "rdo":rows
     })
   })
}

exports.getSolicitudes = (req, res) =>{
  Solicitudes.findAll({
    attributes:['id_solicitud','fecha','nombreEmpleado','codigo_presupuestal']
  }).then(sol=>{
    res.status(200).json({
      "sol":sol
    })
  })
}

exports.getItemsSolicitud = (req,res)=>{
  let url_base = '/api/items_solicitud/'
  let idSolicitud = req.url.replace(url_base,'')
  ItemsSolicitud.findAll({
    where:{id_solicitud:idSolicitud},
    attributes:['idBienes','codTipoBien','nombre','unidadMedida','precioUnitario','id_solicitud','cantidad','tipoBien','precioTotal']
  }).then(is => {
    res.status(200).json({
      "is":is
    })
  })
 }
exports.adminBoard = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Admin Board",
      "error": err
    });
  })
}
 
exports.managementBoard = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Management Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Management Board",
      "error": err
    });
  })
}