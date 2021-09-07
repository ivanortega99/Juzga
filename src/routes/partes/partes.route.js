const express = require('express');
const router = express.Router();

const partesController = require('../../controllers/partes/partes.controller');

// Ontener todas las partes
router.get('/', partesController.getPartes);

// Obtener una parte
router.get('/:id', partesController.getParte);

// Crear una parte
router.post('/', partesController.createParte);

// Actualizar una parte
router.put('/:id', partesController.updateParte);

// Agregar numero de telefono
router.post('/new-phone/:id', partesController.addTelefono);

// Agregar correo electronico
router.post('/new-email/:id', partesController.addCorreo);

// Actualizar numero de telefono
router.put('/phone/:id_telefono', partesController.updateTelefono);

// Actualizar correo electronico
router.put('/email/:id_correo', partesController.updateCorreo);

// Eliminar numero de telefono
router.delete('/phone/:id_parte/:id_telefono', partesController.deleteTelefono);

// Eliminar correo electronico
router.delete('/email/:id_parte/:id_correo', partesController.deleteCorreo);

// Eliminar parte
router.delete('/:id_parte', partesController.deleteParte);

module.exports = router;