const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const loginRouter = require('./routes/login/login.route');
const usuariosRouter = require('./routes/usuarios/usuarios.route');
const carpetaRouter = require('./routes/carpeta/carpeta.route');
const notificacionesRouter = require('./routes/notificaciones/notificaciones.route');
const minutaRouter = require('./routes/minuta/minuta.route');
const partesRouter = require('./routes/partes/partes.route');

const app = express();
app.set('port', process.env.PORT || 3005);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions = {
    origin: 'http://localhost:4200/',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, DELETE, POST, OPTIONS"
}

app.use(cors());

// static files
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-API-KEY, X-Requested-With, Content-Type, Accept, Authorization, content-type, application/json, Access-Control-Allow-Request-Method'
	);
	res.header('Access-Control-Allow-Credentials', "true");
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	
	next();
});

app.use('/api/login', loginRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/carpeta', carpetaRouter);
app.use('/api/notificacion', notificacionesRouter);
app.use('/api/minuta', minutaRouter);
app.use('/api/partes', partesRouter);

app.listen(app.get('port'), () => {
    console.log('Server on port -> ', app.get('port'));
});