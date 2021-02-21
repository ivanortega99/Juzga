const { Router } = require ('express');
const router = Router();
const controller = require('../Controller/controller.js');

router.get('/users',controller.showUsers);

 module.exports = router;