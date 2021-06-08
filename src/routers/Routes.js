const { Router } = require ('express');
const router = Router();
const controller = require('../Controller/controller.js');

router.get('/users',controller.showUsers);
router.post('/login',controller.loginUser);


 module.exports = router;