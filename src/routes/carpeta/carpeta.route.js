const express = require('express');
const router = express.Router();

const carpetaController = require('../../controllers/carpeta/carpeta.controller');

// Obtener todas las carpetas
router.get('/', carpetaController.getCarpetas);

// Obtener datos de carpeta
router.get('/:id', carpetaController.getCarpeta);

// Crear una carpeta
router.post('/', carpetaController.createCarpeta);

// Modificar carpeta
router.put('/:id', carpetaController.updateCarpeta);

// Eliminar carpeta
router.delete('/:id', carpetaController.deleteCarpeta);

module.exports = router;