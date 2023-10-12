exports.success = function (req, resp, message, status) {
    resp.status(status || 200).send({
        error: '',
        body: message
    })
}

exports.error = function (req, resp, message, status) {
    resp.status(status || 500).send({
        error: message,
        body: ''
    })
}