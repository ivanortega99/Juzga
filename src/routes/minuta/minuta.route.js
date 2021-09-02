const express = require('express');
const router = express.Router();

let controllerMinuta = require('../../controllers/minuta/minuta.controller');

// Obtener datos para crear minuta
router.get('/data', controllerMinuta.getDataToCreateMinuta);

// Crear una minuta
router.post('/', controllerMinuta.createMinuta);

module.exports = router;