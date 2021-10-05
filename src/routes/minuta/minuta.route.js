const express = require('express');
const router = express.Router();

let controllerMinuta = require('../../controllers/minuta/minuta.controller');

// Obtener todas las minutas
router.get('/', controllerMinuta.getMinutas);

// Obtener una minuta
router.get('/:id', controllerMinuta.getMinuta);

// Obtener datos para crear minuta
router.get('/data', controllerMinuta.getDataToCreateMinuta);

// Crear una minuta
router.post('/', controllerMinuta.createMinuta);

// Actualizar minuta


// Eliminar minuta
router.delete('/:id', controllerMinuta.deleteMinuta);

module.exports = router;