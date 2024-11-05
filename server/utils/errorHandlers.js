class ApiError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

const callbackErrorHandler = (callback) => {
    return async (req, res, next) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            const status = error.statusCode || 500;
            const message = error.message || 'An internal server error occurred';
            res.status(status).json({ message, details: error.details });
        }
    };
};

module.exports = {
    ApiError,
    callbackErrorHandler,
};
