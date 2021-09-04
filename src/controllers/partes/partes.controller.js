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