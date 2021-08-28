const carpetaDao = require('../../dao/carpeta/carpeta.dao');

// Obtener todas las carpetas
exports.getCarpetas = async () => {
    try {
        let daoResponse = await carpetaDao.getCarpetas();

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Obtener una sola carpeta
exports.getCarpeta = async (carpetaId) => {
    try {
        let daoResponse = await carpetaDao.getCarpeta(carpetaId);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Crear carpeta
exports.createCarpeta = async (data) => {
    try {
        let daoResponse = await carpetaDao.createCarpeta(data);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}