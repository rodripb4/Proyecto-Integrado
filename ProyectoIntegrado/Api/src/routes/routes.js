var verifySignUp = require('../routes/verifySignUp'),
    controller = require('../controller/controller'),
    authJwt = require('../routes/verifyJwtToken')

module.exports = function(app) {
    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);  
    app.post('/api/auth/signin', controller.signin);
    app.get('/api/user', [authJwt.verifyToken], controller.userContent);
    app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}    
