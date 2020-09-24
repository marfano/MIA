
const mongoose = require('mongoose'); //requiero módulo mongoose

const {database} = require('./keys'); //Importo db desde keys.js --> del objeto, solo database

mongoose.connect(database.URI, {   //Obtengo dirección de mongodb
    useNewUrlParser: true     //Configuración específica de mongodb
})
    .then(db => console.log('DB is conected')) //Cuando se conecte, muestra mensaje por consola
    .catch(err => console.error(err)); //Caso error
