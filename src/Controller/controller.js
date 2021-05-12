const dbOperations = require('../DB/dbOperations.js');
const controller = {};

//Controladores
controller.showUsers = (request, response) => {
    dbOperations.getUsers().then(result => {
        response.json(result);
    })
}

controller.login = async(req, res) => {

    let existe = await pool.query('SELECT * FROM usr_User WHERE usr_username = ?', [req.body.usr_username]);
    if (existe.length == 0) {
        res.render('error', { mensaje: "Usuario no encontrado" });
    } else {
        if (req.body.password == existe[0].usr_password) {
            res.redirect('menu');
        } else {
            res.render('error', { mensaje: "Contraseña invalida" });
        }
    }
    //res.redirect('/');
}

module.exports = controller;