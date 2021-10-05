const express = require('express');
const router = express.Router();

const notificacionesController = require('../../controllers/notificaciones/notificaciones.controller');

// Obtener todas las notificaciones
router.get('/', notificacionesController.getNotificaciones);

// Obtener una notificacion
router.get('/:id', notificacionesController.getNotificacion);

// Crear notificaciones
router.post('/', notificacionesController.createNotification);

// Actualizar notificacion
router.put('/:id', notificacionesController.updateNotification);

// Eliminar notificacion
router.delete('/:id', notificacionesController.deleteNotification);

module.exports = router;