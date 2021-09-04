const serviceMinuta = require('../../services/minuta/minuta.service');

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