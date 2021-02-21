const dbOperations = require('../DB/dbOperations.js');
const controller = {};

//Controladores
controller.showUsers = (request, response) => {
    dbOperations.getUsers().then(result => {
        response.json(result);
    })
}

module.exports = controller;