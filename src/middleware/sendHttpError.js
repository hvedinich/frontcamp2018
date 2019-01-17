module.exports = function (req, res, next) {
    res.sendHttpError = function (error, next) {
        console.error(error.stack)
        res.status(error.status || 500);
        if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error.message);
        } else {
            res.send({ error: error.message });
        }
    };
    next();
};
