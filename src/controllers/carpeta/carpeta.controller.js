const carpetaService = require('../../services/carpeta/carpeta.service');

// Obtener todas las carpetas
exports.getCarpetas = async (req, res) => {
    try {
        let serviceResponse = await carpetaService.getCarpetas();

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Obtener datos de una carpeta
exports.getCarpeta = async (req, res) => {
    try {
        let carpetaId = req.params.id;
        let serviceResponse = await carpetaService.getCarpeta(carpetaId);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}

// Crear carpeta
exports.createCarpeta = async (req, res) => {
    try {
        let data = req.body;
        let serviceResponse = await carpetaService.createCarpeta(data);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}