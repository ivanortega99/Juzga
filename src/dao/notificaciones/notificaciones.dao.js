const db = require('../../config/db');

// Obtener todas las notificaciones
exports.getNotificaciones = async () => {
    try {
        let notificaciones = await db.query("SELECT * FROM Notificacion");

        return {
            message: "Notificaciones obtenidas!",
            payload: notificaciones,
            code: 200
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.dao",
            payload: {},
            code: 500
        }
    }
}

// Obtener una notificacion
exports.getNotificacion = async (idNotificacion) => {
    try {
        let query = "SELECT Notificacion.id_notificacion, Notificador.id_notificador, Juez.id_juez, nombre_juez, apellidos_juez, nombre_notificador, apellidos_notificador, nuc_notificacion, fecha, acuerdo, descripcion, archivo " +
        "FROM Notificacion INNER JOIN Juez INNER JOIN Notificador " +
        "ON Notificacion.id_juez = Juez.id_juez " +
        "AND Notificacion.id_notificador = Notificador.id_notificador " +
        "WHERE Notificacion.id_notificacion = ?";

        let notificacion = await db.query(query, [idNotificacion]);

        return {
            message: "Notificacion obtenida!",
            payload: notificacion,
            code: 200
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.dao",
            payload: {},
            code: 500
        }
    }
}

// Crear notificacion
exports.createNotification = async (dataNotification) => {
    try {
        let notificationCreated = await db.query("INSERT INTO Notificacion (id_juez, id_notificador, nuc_notificacion, acuerdo, fecha, descripcion, archivo) VALUES (?, ?, ?, ?, ?, ?, ?)", [
            dataNotification.id_juez,
            dataNotification.id_notificador,
            dataNotification.nuc_notificacion,
            dataNotification.acuerdo,
            new Date(),
            dataNotification.descripcion,
            dataNotification.archivo
        ]);

        return {
            message: "Notificacion creada",
            payload: { created: notificationCreated.insertId },
            code: 201
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.dao",
            payload: {},
            code: 500
        }
    }
}

// Actualizar notificacion
exports.updateNotification = async (id_notificacion, dataToUpdate) => {
    try {
        let notificacionUpdated = await db.query("UPDATE Notificacion SET nuc_notificacion = ?, acuerdo = ?, descripcion = ? WHERE id_notificacion = ?", [
            dataToUpdate.nuc_notificacion,
            dataToUpdate.acuerdo,
            dataToUpdate.descripcion,
            id_notificacion
        ]);

        return {
            message: "Notificación actualizada",
            payload: { updated: id_notificacion },
            code: 201
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.dao",
            payload: {},
            code: 500
        }
    }
}

// Eliminar notificacion
exports.deleteNotification = async (id_notificacion) => {
    try {
        let notificactionDeleted = await db.query("DELETE FROM Notificacion WHERE id_notificacion = ?", id_notificacion);

        return {
            message: "Notificación eliminada!",
            payload: { deleted: id_notificacion },
            code: 200
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Error at notificaciones.dao",
            payload: {},
            code: 500
        }
    }
}