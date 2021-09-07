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

// Agregar una parte
exports.createParte = async (dataParte) => {
    try {
        let daoResponse = await partesDao.createParte(dataParte);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Actualizar datos parte
exports.updateParte = async (id_parte, dataToUpdate) => {
    try {
        let daoResponse = await partesDao.updateParte(id_parte, dataToUpdate);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Agregar numero de telefono
exports.addTelefono = async (id_parte, telefono) => {
    try {
        let daoResponse = await partesDao.addTelefono(id_parte, telefono);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Agregar correo electronico
exports.addCorreo = async (id_parte, correo) => {
    try {
        let daoResponse = await partesDao.addCorreo(id_parte, correo);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Actualizar numero de telefono
exports.updateTelefono = async (id_telefono, newTelefono) => {
    try {
        let daoResponse = await partesDao.updateTelefono(id_telefono, newTelefono);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Actualizar correo electronico
exports.updateCorreo = async (id_correo, newCorreo) => {
    try {
        let daoResponse = await partesDao.updateCorreo(id_correo, newCorreo);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Eliminar numero de telefono
exports.deleteTelefono = async (id_parte, id_telefono) => {
    try {
        let daoResponse = await partesDao.deleteTelefono(id_parte, id_telefono);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Eliminar correo electronico
exports.deleteCorreo = async (id_parte, id_correo) => {
    try {
        let daoResponse = await partesDao.deleteCorreo(id_parte, id_correo);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Eliminar parte
exports.deleteParte = async (id_parte) => {
    try {
        let daoResponse = await partesDao.deleteParte(id_parte);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}