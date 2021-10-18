const daoMinuta = require('../../dao/minuta/minuta.dao');

// Obtener todas las minutas
exports.getMinutas = async () => {
    try {
        let daoResponse = await daoMinuta.getMinutas();

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Obtener una minuta
exports.getMinuta = async (id_minuta) => { 
    try {
        let daoResponse = daoMinuta.getMinuta(id_minuta);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

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

// Actualizar minuta
exports.updateMinuta = async (id_minuta, dataToUpdate) => {
    try {
        let daoResponse = await daoMinuta.updateMinuta(id_minuta, dataToUpdate);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Eliminar minuta
exports.deleteMinuta = async (id_minuta) => {
    try {
        let daoResponse = await daoMinuta.deleteMinuta(id_minuta);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}