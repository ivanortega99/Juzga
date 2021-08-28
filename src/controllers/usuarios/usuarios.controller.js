const usuariosService = require('../../services/usuarios/usuarios.service');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        let serviceResponse = await usuariosService.getUsers();

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Obtener un usuario
exports.getUser = async (req, res) => {
    try {
        let userId = req.params.id;

        let serviceResponse = await usuariosService.getUser(userId);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Crear usuario
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

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let dataToUpdate = req.body;
        let serviceResponse = await usuariosService.updateUser(userId, dataToUpdate);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let serviceResponse = await usuariosService.deleteUser(userId);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}