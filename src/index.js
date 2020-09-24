//configurar express
const express = require('express'); //requiere framework express
const config = require('./server/config'); //guarda requerimiento de configuraciones

//database
require('./database'); //Ejecuta

//Config - Express
const app = config(express()); //guarda resultado de config en express, en app - pasa resulktados de express a config --> config.js


//Starting the server
//configuración de puerto
app.listen(app.get('port'), () => {  
    console.log('Server on port', app.get('port')); //muestra puerto por consola. Recibe puerto de app --> desde config.js

});