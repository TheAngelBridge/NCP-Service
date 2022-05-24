
/**
 * Enum for API Error represented.
 * 
 * Covering from client's error or validation to error for server response
 * 
 * @readonly
 * @enum {string} Error Messages
 */
export const ApiErrorCase = {
    invalidURL: 'Invalid URL',
    httpStatusCode: `Unexpected HTTP Status Code :`,
    unexpectedResponse: 'Unexpected response from the server',
    noResponseFromServer: 'No response from the server',
    requestConfigurationError: 'Error occured during setup request'
}


/**
 * Error class for handling ApiError
 * 
 */
export class ApiError extends Error {
    /**
     * 
     * @param errorCase `string` Error cases which can be handled by NCP Client service
     * @param statusCode `number` httpStatusCode received from axios response
     */
    constructor(errorCase: string, statusCode?: number|undefined) {
        // generating error message, if error occured reason is http status code, construct error message with status code.
        statusCode === undefined ? super(errorCase) : super(`${errorCase} ${statusCode}`)
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}