const express = require('express');
const morgan = require('morgan');
const { prependListener } = require('./config/db');
// require('./config/db');

const app = express();

app.set('port', process.env.PORT || 3005);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());





app.listen(app.get('port'), () => {
    console.log('Server on port -> ', app.get('port'));
});