const { Router } = require ('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({"Titlle" : "Mamacitas"});
 });
 

 module.exports = router;