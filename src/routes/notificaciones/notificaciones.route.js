const express = require('express');
const router = express.Router();

const notificacionesController = require('../../controllers/notificaciones/notificaciones.controller');

// Obtener todas las notificaciones
router.get('/', notificacionesController.getNotificaciones);

// Obtener una notificacion
router.get('/:id', notificacionesController.getNotificacion);

// Crear notificaciones
router.post('/', notificacionesController.createNotification);

module.exports = router;