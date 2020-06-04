var verifySignUp = require('../routes/verifySignUp'),
    controller = require('../controller/controller'),
    authJwt = require('../routes/verifyJwtToken')

module.exports = function(app) {
    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);  
    app.post('/api/auth/signin', controller.signin);
    app.get('/api/user', [authJwt.verifyToken], controller.userContent);
    app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
    app.get('/api/responsables',/*[authJwt.verifyToken],*/ controller.getResponsables)
    app.get('/api/solicitudes',/*[authJwt.verifyToken],*/controller.getSolicitudes)
    app.get('/api/items_solicitud/:id_solicitud',/*[authJwt.verifyToken],*/controller.getItemsSolicitud)
    app.post('/api/solicitud',controller.setSolicitud)
    app.post('/api/items_solicitud',controller.setSolicitudItem)

}    
