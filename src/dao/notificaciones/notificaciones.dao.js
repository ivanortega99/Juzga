const db = require('../../config/db');

// Obtener todas las notificaciones
exports.getNotificaciones = async () => {
    try {
        let notificaciones = await db.query("SELECT * FROM Notificaciones");

        return {
            message: "Notificaciones obtenidas!",
            payload: notificaciones,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Obtener una notificacion
exports.getNotificacion = async (idNotificacion) => {
    try {
        let query = "SELECT Notificaciones.id_notificacion, Notificador.id_notificador, Juez.id_juez, nombre_juez, apellidos_juez, nombre_notificador, apellidos_notificador, nuc, fecha, acuerdo, descripcion, archivo " +
        "FROM Notificaciones INNER JOIN Juez INNER JOIN Notificador INNER JOIN NotificadorNotificaciones " +
        "ON Notificaciones.id_juez = Juez.id_juez " +
        "AND Notificaciones.id_notificacion = NotificadorNotificaciones.id_notificacion " +
        "AND NotificadorNotificaciones.id_notificador = Notificador.id_notificador " +
        "WHERE Notificaciones.id_notificacion = ?";

        let notificacion = await db.query(query, [idNotificacion]);

        return {
            message: "Notificacion obtenida!",
            payload: notificacion,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Crear notificacion
exports.createNotification = async (dataNotification) => {
    try {
        console.log('here', dataNotification)
        let notificationCreated = await db.query("INSERT INTO Notificaciones (id_juez, nuc, acuerdo, fecha, descripcion, archivo) VALUES (?, ?, ?, ?, ?, ?)", [
            dataNotification.id_juez,
            dataNotification.nuc,
            dataNotification.acuerdo,
            new Date(),
            dataNotification.descripcion,
            dataNotification.archivo
        ]);


        let relationship = await db.query("INSERT INTO NotificadorNotificaciones (id_notificacion, id_notificador) VALUES (?, ?)", [notificationCreated.insertId, dataNotification.id_notificador])

        return {
            message: "Notificacion creada",
            payload: { created: notificationCreated.insertId },
            code: 201
        }
    } catch (err) {
        
    }
}