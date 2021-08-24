const usuariosService = require('../../services/usuarios/usuarios.service');

exports.addUser = async (req, res) => {
    try {
        let serviceResponse = await usuariosService.addUser(req.body);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
        res.status(501).json({
            message: "Something is wrong",
            payload: err
        });
    }
}