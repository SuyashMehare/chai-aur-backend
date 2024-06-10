// export const ApiResponse = (
//     status,
//     resBody = {},
//     message = "success"
// ) => {

//     return {
//         status : status,
//         serverResponse: resBody,
//         message:message
//     }
// }

class ApiResponse {

    constructor(statusCode, data, message = "Success"){

        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = (statusCode < 400)
    }
}

export {ApiResponse}