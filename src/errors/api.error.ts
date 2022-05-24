
/**
 * Enum for API Error represented.
 * 
 * Covering from client's error or validation to error for server response
 * 
 * @readonly
 * @enum {string} Error Messages
 */
const ErrorCode = {
    
    invalidURL: 'API000',
    requestConfigurationError: 'API001',

    httpError: 'API100',
    unexpectedResponse: 'API101',
    noResponseFromServer: 'API102',
    
    unHandledError: 'API200'
}
export interface ApiErrorCase {
    code: string
    message: string
}
function genError(code: string, message: string): ApiErrorCase { return { code, message } } 

export const ErrorCases = {
    API: {
        invalidURL: genError(ErrorCode.invalidURL, 'Invalid URL'),
        requestConfigurationError: genError(ErrorCode.requestConfigurationError, 'Request Configuration Error'),
        httpError: genError(ErrorCode.httpError, 'Http Error'),
        unexpectedResponse: genError(ErrorCode.unexpectedResponse, 'Unexpected Response'),
        noResponseFromServer: genError(ErrorCode.noResponseFromServer, 'No Response From Server'),
        unHandledError: genError(ErrorCode.unHandledError, 'Unhandled Error'),
    }
}

/**
 * Error class for handling ApiError
 * 
 */
export class ApiError extends Error {
    private error: ApiErrorCase
    /**
     * 
     * @param errorCase `string` Error cases which can be handled by NCP Client service
     */
    constructor(errorCase: ApiErrorCase) {
        super()
        this.error = errorCase
        Object.setPrototypeOf(this, ApiError.prototype)
    }
    get(): ApiErrorCase {
        return this.error
    }
}