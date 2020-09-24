//Configuraciones de express

//Imports

    //Modeules
const path = require('path'); //Importo móduclo path --> permite unir directorios
const exphbs = require('express-handlebars'); //Importa módulo express-handlebars
const morgan = require('morgan'); //Importa módulo morgan - middleware
const multer = require('multer'); //Importa multer- middleware
const express = require('express'); //Importa express -- en función de usar sus milddwares
const erroHandler = require('errorhandler'); //Importa módulo errorhandler

    //Routes
const routes = require('../routes/index'); //Importa desde la carpeta routs, index.js



//Importo función - configura plantillas, rutas, - requiere app de index.js
module.exports = app => {

    //Settings
    app.set('port', process.env.PORT||3000); //configuración del puerto --> Establezco puerto. Si existe puerto en el sistema: usarlo, sino: usar puerto 3000
    app.set('views', path.join(__dirname, 'views')); //Une directorios dirname y views

        //Configuración de handlebars
    app.engine('.hbs', exphbs({
        defaultLayout: 'main', //layout principal
        partialsDir: path.join(app.get('views'), 'partials'), //partials --> secciones reutilizables de html - relaciona views con partials
        layoutsDir: path.join(app.get('views'), 'layouts'), //layouts - relaciona views con layouts
        extname: '.hbs', //Extensiones
        helpers: require('./helpers') //server>helpers.js
    }));
    app.set('view engine', '.hbs'); //Reconocimeinto de hbs 

    //middlewares
    app.use(morgan('dev')); //configuración dev
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')); //De dónde a dónde va el archivo - caso: todas las imágenes accesibles para todos los usuarios... si se sube una imágen , la misma se guarda en esta carpeta - single: se procesa de a una (todos sus datos) bajo nombre 'image'
    app.use(express.urlencoded({extended:false})); //módulo urlencode --> permite recibir datos desde formularios HTML
    app.use(express.json()); //"Para los likes" --> peticiones http desde AJAX --> ajax envia objetos --> uso json

    //routes
    routes(app); //A routes, app

    //static files --> contenido estático
    app.use('/public', express.static(path.join(__dirname, '../public'))); //carpeta public

    //errorhandlers
    if ('davelopment' === app.get('env')){ //--> usando variables de entorno. Igual a davelopment: 
        app.use(erroHandler);
    } 

    return app;
}