const mysql = require('mysql');

const conexion = mysql.createConnection({
//host: 'localhost'
//database:
//user:
//password:
});

/*conexion.connect(function(error){
     if(error){
       throw error;
      } else {

       console.log('CONEXION EXITOSA');
    }

//});

//Querys

conexion.query('SELECT * from Table', function(error, results, fields) {
    if (error)
   throw error; 

    results.forEach(results => {
        console.log(results);
    });

});

conexion.end();*/