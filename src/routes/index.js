//Función routes
//Define las rutas
module.exports = app => { 
    
    //Página inicial
    app.get('/', (req,res) => {
        res.send('Index page');
        }); 
        
};