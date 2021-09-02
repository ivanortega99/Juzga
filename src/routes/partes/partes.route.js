const express = require('express');
const router = express.Router();

const partesController = require('../../controllers/partes/partes.controller');

// Ontener todas las partes
router.get('/', partesController.getPartes);

// Obtener una parte
router.get('/:id', partesController.getParte);

module.exports = router;