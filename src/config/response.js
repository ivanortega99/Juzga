exports.success = (req, res, message, status) => {
    res.status(status || 200).send({
        err: '',
        payload: message
    });
}

exports.error = (req, res, message, status, details) => {
    res.status(status || 500).send({
        err: message,
        payload: ''
    });
}