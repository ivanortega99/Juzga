const express = require ('express');
const app = express();
const morgan = require ('morgan');

//settings 
app.set('port', process.env.PORT || 3000); //en dado caso que exista un puerto definido ustilizalo [process.env.PORT] sino el que deje definido
app.set('json spaces', 2);


//middlwaers
app.use (morgan('dev'));
app.use (express.urlencoded({extended: false}));//entender los datos que llegan de los formularios (sencillos como texto)
app.use (express.json());

//input routers
app.use(require('./routers/indexR'));

// stating the server
app.listen(app.get('port'), () => {
 console.log(`Server on port ${app.get('port')}`);

});