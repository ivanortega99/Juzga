const loginDAO = require('../../dao/login/login.dao');

exports.login = async (email, password) => {
    try {
        let daoResponse = await loginDAO.login(email, password);
        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}