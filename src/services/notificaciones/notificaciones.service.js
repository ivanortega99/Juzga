const daoNotificaciones = require('../../dao/notificaciones/notificaciones.dao');

// Obtener todas las notificaciones
exports.getNotificaciones = async () => {
    try {
        let daoResponse = await daoNotificaciones.getNotificaciones();

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Obtener una notificacion
exports.getNotificacion = async (idNotificacion) => {
    try {
        let daoResponse = await daoNotificaciones.getNotificacion(idNotificacion);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Crear notificaciones
exports.createNotificaction = async (dataNotification) => {
    try {
        let daoResponse = await daoNotificaciones.createNotification(dataNotification);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}