const loginService = require('../../services/login/login.service');

exports.login = async (req, res) => {
    try {
        console.log(req.body)
        let email = req.body.usr_mail;
        let password = req.body.usr_password;

        let serviceResponse = await loginService.login(email, password);
        console.log(serviceResponse)
        res.status(serviceResponse.code).json({
            message: serviceResponse.message,
            payload: serviceResponse.payload
        });
    } catch (err) {
        console.log(err);
    }
}