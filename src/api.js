const express = require('express');
const app = express();
const morgan = require('morgan');

//settings 
app.set('port', process.env.PORT || 3000); //en dado caso que exista un puerto definido ustilizalo [process.env.PORT] sino el que deje definido
app.set('json spaces', 2);


//middlwaers
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));//entender los datos que llegan de los formularios (sencillos como texto)
app.use(express.json());

app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});


//input routers
app.use('/api', require('./routers/Routes.js'));

// stating the server
/*app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});*/ 

app.listen(3000, function() {
  console.log('app is listening on port 3000...')
})
