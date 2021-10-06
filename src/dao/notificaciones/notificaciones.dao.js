const db = require('../../config/db');

// Obtener todas las notificaciones
exports.getNotificaciones = async () => {
    try {
        let notificaciones = await db.query("SELECT nuc_notificacion, CONCAT(nombre_notificador, ' ', apellidos_notificador) AS Notificador, CONCAT(nombre_juez, ' ', apellidos_juez) AS Juez, fecha_notificacion, notificacion_enviada " +
            "FROM Notificacion INNER JOIN Juez INNER JOIN Notificador " +
            "ON Notificacion.id_juez = Juez.id_juez " +
            "AND Notificacion.id_notificador = Notificador.id_notificador");

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
        let query = "SELECT Notificacion.id_notificacion, Notificador.id_notificador, Juez.id_juez, CONCAT(nombre_notificador, ' ', apellidos_notificador) AS Notificador, CONCAT(nombre_juez, ' ', apellidos_juez) AS Juez, nuc_notificacion, fecha_notificacion, hora_notificacion, acuerdo_notificacion, descripcion_notificacion, archivo_notificacion, notificacion_enviada, notificacion_entregada " +
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
        let date = new Date();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let notificationCreated = await db.query("INSERT INTO Notificacion (id_juez, id_notificador, nuc_notificacion, acuerdo_notificacion, fecha_notificacion, hora_notificacion, descripcion_notificacion, archivo_notificacion, notificacion_enviada, notificacion_entregada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            dataNotification.id_juez,
            dataNotification.id_notificador,
            dataNotification.nuc_notificacion,
            dataNotification.acuerdo,
            date,
            hour + ":" + minutes + ":" + seconds,
            dataNotification.descripcion,
            dataNotification.archivo,
            true,
            true
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
        let notificacionUpdated = await db.query("UPDATE Notificacion SET nuc_notificacion = ?, acuerdo_notificacion = ?, descripcion_notificacion = ? WHERE id_notificacion = ?", [
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