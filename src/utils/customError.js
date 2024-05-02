class CustomError extends Error {
    
    constructor(messsage,statusCode){

        super(messsage || 'error')
        this.statusCode = statusCode || 500;
        this.isOperational = true;
    }

}

module.exports = {CustomError};

