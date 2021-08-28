const express = require('express');
const router = express.Router();

const usuariosController = require('../../controllers/usuarios/usuarios.controller');

// Obtener todos los usuarios
router.get('/', usuariosController.getUsers);

// Obtener un usuario
router.get('/:id', usuariosController.getUser);

// Crear un usuario
router.post('/', usuariosController.addUser);

// Actualizar un usuario
router.put('/:id', usuariosController.updateUser);

// Eliminar un usuario
router.delete('/:id', usuariosController.deleteUser);

module.exports = router;