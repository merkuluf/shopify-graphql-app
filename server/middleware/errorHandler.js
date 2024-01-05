
const errorHandler = (err, req, res, next) => {
    console.log('>',err.message)
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode,
        }
    });
};

module.exports = errorHandler;
