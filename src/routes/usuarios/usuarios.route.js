const express = require('express');
const router = express.Router();

const usuariosController = require('../../controllers/usuarios/usuarios.controller');

// Crear un usuario
router.post('/', usuariosController.addUser);

module.exports = router;