var config = require('../DB/dbConfig');
const sql = require('mssql');

const controller = {};

//Funciones en la BD
async function getUsers(){
    try {
        let pool = await sql.connect(config);
        let usuarios = await pool.request().query("SELECT usr_id,usr_username,typ_name FROM usr_User INNER JOIN typ_UserType ON usr_User.usr_tipo_fk = typ_UserType.typ_id");
        return usuarios.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

controller.login = async(req, res) => {

    let existe = await pool.query('SELECT * FROM usuario WHERE correo = ?', [req.body.email]);
    if (existe.length == 0) {
        res.render('error', { mensaje: "Usuario no encontrado" });
    } else {
        if (verificaConrasena(req.body.password, existe[0].contrasena)) {
            let token = jwt.sign({
                usuario: existe[0]
            }, process.env.seed, { expiresIn: 60 * 60 * 24 * 30 });
            req.session.token = token;

            res.redirect('videos');
        } else {
            res.render('error', { mensaje: "Contraseña invalida" });
        }
    }
    //res.redirect('/');
}

module.exports = {
    getUsers: getUsers,
}