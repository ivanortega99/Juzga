const partesService = require('../../services/partes/partes.service');

// Obtener todas las partes
exports.getPartes = async (req, res) => {
    try {
        let serviceResponse = await partesService.getPartes();

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Obtener una parte
exports.getParte = async (req, res) => {
    try {
        let id_parte = req.params.id;
        let serviceResponse = await partesService.getParte(id_parte);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Crear una parte
exports.createParte = async (req, res) => {
    try {
        let dataParte = req.body;
        let serviceResponse = await partesService.createParte(dataParte);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Actualizar una parte
exports.updateParte = async (req, res) => {
    try {
        let id_parte = req.params.id;
        let dataToUpdate = req.body;

        let serviceResponse = await partesService.updateParte(id_parte, dataToUpdate);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Agregar numero de telefono
exports.addTelefono = async (req, res) => {
    try {
        let id_parte = req.params.id;
        let telefono = req.body.telefono;

        let serviceResponse = await partesService.addTelefono(id_parte, telefono);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Agregar correo electronico
exports.addCorreo = async (req, res) => {
    try {
        let id_parte = req.params.id;
        let correo = req.body.correo;

        let serviceResponse = await partesService.addCorreo(id_parte, correo);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Actualizar numero de telefono
exports.updateTelefono = async (req, res) => {
    try {
        let id_telefono = req.params.id_telefono;
        let newTelefono = req.body.newTelefono;

        let serviceResponse = await partesService.updateTelefono(id_telefono, newTelefono);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Actualizar correo electronico
exports.updateCorreo = async (req, res) => {
    try {
        let id_correo = req.params.id_correo;
        let newCorreo = req.body.newCorreo;

        let serviceResponse = await partesService.updateCorreo(id_correo, newCorreo);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Eliminar numero de telefono
exports.deleteTelefono = async (req, res) => {
    try {
        let id_parte = req.params.id_parte;
        let id_telefono = req.params.id_telefono;

        let serviceResponse = await partesService.deleteTelefono(id_parte, id_telefono);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Eliminar correo electronico
exports.deleteCorreo = async (req, res) => {
    try {
        let id_parte = req.params.id_parte;
        let id_correo = req.params.id_correo;

        let serviceResponse = await partesService.deleteCorreo(id_parte, id_correo);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Eliminar parte
exports.deleteParte = async (req, res) => {
    try {
        let id_parte = req.params.id_parte;

        let serviceResponse = await partesService.deleteParte(id_parte);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}