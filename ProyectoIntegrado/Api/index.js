const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Init

const app= express();

//Opciones

app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With,x-access-token, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//Rutas
require('./src/routes/routes')(app);
app.use(require('./src/routes/empleados'));
//Public 

//Start server 

app.listen(app.get('port'), ()=>{
    console.log('Servidor en puerto', app.get('port'));
});
