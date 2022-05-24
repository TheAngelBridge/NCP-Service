

/**
 * Enum for Errors by http status code which provided by NCP SENS API
 * 
 * @readonly
 * @enum {number} Http Status Code
 */
enum SENS_Error {
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    tooManyRequests = 429,
    internalServerError = 500
}