const daoNotificaciones = require('../../dao/notificaciones/notificaciones.dao');

// Obtener todas las notificaciones
exports.getNotificaciones = async () => {
    try {
        let daoResponse = await daoNotificaciones.getNotificaciones();

        return daoResponse;
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.service",
            payload: {},
            code: 500
        }
    }
}

// Obtener una notificacion
exports.getNotificacion = async (idNotificacion) => {
    try {
        let daoResponse = await daoNotificaciones.getNotificacion(idNotificacion);

        return daoResponse;
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.service",
            payload: {},
            code: 500
        }
    }
}

// Crear notificaciones
exports.createNotificaction = async (dataNotification) => {
    try {
        let daoResponse = await daoNotificaciones.createNotification(dataNotification);

        return daoResponse;
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.service",
            payload: {},
            code: 500
        }
    }
}

// Actualizar notificacion
exports.updateNotification = async (id_notificacion, dataToUpdate) => {
    try {
        let daoResponse = await daoNotificaciones.updateNotification(id_notificacion, dataToUpdate);

        return daoResponse;
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.service",
            payload: {},
            code: 500
        }
    }
}

// Eliminar notificacion
exports.deleteNotification = async (id_notificacion) => {
    try {
        let daoResponse = await daoNotificaciones.deleteNotification(id_notificacion);

        return daoResponse;
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.service",
            payload: {},
            code: 500
        }
    }
}