const daoMinuta = require('../../dao/minuta/minuta.dao');

// Datos para crear una minuta
exports.getDataToCreateMinuta = async () => {
    try {
        let daoResponse = await daoMinuta.getDataToCreateMinuta();

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Crear minuta
exports.createMinuta = async (dataMinuta) => {
    try {
        let daoResponse = await daoMinuta.createMinuta(dataMinuta);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}