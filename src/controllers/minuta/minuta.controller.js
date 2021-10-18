const serviceMinuta = require('../../services/minuta/minuta.service');

// Obtener todas las minutas
exports.getMinutas = async (req, res) => {
    try {
        let serviceResponse = await serviceMinuta.getMinutas();

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Obtener una minuta
exports.getMinuta = async (req, res) => {
    try {
        let id_minuta = req.params.id;

        let serviceResponse = await serviceMinuta.getMinuta(id_minuta);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Datos para crea una minuta
exports.getDataToCreateMinuta = async (req, res) => {
    try {
        let serviceResponse = await serviceMinuta.getDataToCreateMinuta();

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Crear una minuta
exports.createMinuta = async (req, res) => {
    try {
        let dataMinuta = req.body;

        let serviceResponse = await serviceMinuta.createMinuta(dataMinuta);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Actualizar minuta
exports.updateMinuta = async (req, res) => {
    try {
        let id_minuta = req.params.id;
        let dataToUpdate = req.body;

        let serviceResponse = await serviceMinuta.updateMinuta(id_minuta, dataToUpdate);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Eliminar minuta
exports.deleteMinuta = async (req, res) => {
    try {
        let id_minuta = req.params.id;

        let serviceResponse = await serviceMinuta.deleteMinuta(id_minuta);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}