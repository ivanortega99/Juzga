const partesDao = require('../../dao/partes/partes.dao');

// Obtener todas las partes
exports.getPartes = async () => {
    try {
        let daoResponse = await partesDao.getPartes();

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Obtener una parte
exports.getParte = async (id_parte) => {
    try {
        let daoResponse = await partesDao.getParte(id_parte);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}