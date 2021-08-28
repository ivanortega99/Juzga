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
    }
}