const serviceNotification = require('../../services/notificaciones/notificaciones.service');

// Obtener todas las notificaciones
exports.getNotificaciones = async (req, res) => {
    try {
        let serviceResponse = await serviceNotification.getNotificaciones();

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error at notificaciones.controller",
            payload: {}
        });
    }
}

exports.getNotificacion = async (req, res) => {
    try {
        let idNotificacion = req.params.id;
        let serviceResponse = await serviceNotification.getNotificacion(idNotificacion);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error at notificaciones.controller",
            payload: {}
        });
    }
}

// Crear notificaciones
exports.createNotification = async (req, res) => {
    try {
        let dataNotification = req.body;
        
        let serviceResponse = await serviceNotification.createNotificaction(dataNotification);

        res.status(serviceResponse.code).json({
            message:serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error at notificaciones.controller",
            payload: {}
        });
    }
}

// Actualizar notificacion
exports.updateNotification = async (req, res) => {
    try {
        let id_notificacion = req.params.id;
        let dataToUpdate = req.body;

        let serviceResponse = await serviceNotification.updateNotification(id_notificacion, dataToUpdate);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error at notificaciones.controller",
            payload: {}
        });
    }
}

//Eliminar notificacion
exports.deleteNotification = async (req, res) => {
    try {
        let id_notificacion = req.params.id;

        let serviceResponse = await serviceNotification.deleteNotification(id_notificacion);

        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error at notificaciones.controller",
            payload: {}
        });
    }
}