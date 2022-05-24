import axios, { AxiosInstance, AxiosResponse, Method } from "axios";
import { ApiError, ErrorCases } from "../errors/api.error";
import { ApiRequest, ApiResponse } from "../interfaces/api.interface";


export class ApiClient {

    private client: AxiosInstance

    constructor(
        baseUrl: string,
        timeout: number = 2000
    ) {
        this.client = axios.create({
            baseURL: baseUrl,
            timeout: timeout
        })
    }

    /**
     * Executing request and wrapping it with ApiClientResponse
     * 
     * will return ApiClientResponse if success, with data else with error message
     * 
     * @template T - Data type matched with each API's response
     * @access public
     * @param apiRequest `ApiRequest` configs for each api service
     * @returns `Promise<ApiClientResponse<T>>` return Promise response of wrapped with error handling
     * @memberof ApiClient
     */
    public async request<T>(apiRequest: ApiRequest): Promise<ApiResponse<T>> {
        try {
            const val = await this.createRequest<T>(apiRequest)
            return {
                isSuccess: true,
                data: val,
            }
        } catch (error) {
            console.log(error)
            return {
                isSuccess: false,
                errorCode: (error instanceof ApiError)? error.get().code : ErrorCases.API.unHandledError.code,
                errorMessage: (error instanceof ApiError)? error.get().message : ErrorCases.API.unHandledError.message,
            }
        }
    }
    /**
     * Execute request and return Promise with error or response if success
     * 
     *  Wrapping axios-request with Promise's resolve / reject for error handling 
     * 
     * @template T - Data type matched with each API's response
     * @access private
     * @param apiRequest `ApiRequest` configs for each api service
     * @returns `Promise<T>` return promised response of http request with current ApiRequest configs and handle errors
     * @memberof ApiClient
     */
    private createRequest<T>(apiRequest: ApiRequest): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.axiosRequest(apiRequest)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((error) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response) {
                            console.log(error.response)
                            reject(new ApiError(ErrorCases.API.httpError))
                        } else if (error.request) {
                            reject(new ApiError(ErrorCases.API.noResponseFromServer))
                        } else {
                            reject(new ApiError(ErrorCases.API.requestConfigurationError))
                        }
                    } else if (error instanceof ApiError) {
                        // url validation Error
                        reject(error)
                    } else {
                        // unexpected Error
                        reject(new ApiError(ErrorCases.API.unHandledError))
                    }
                })
        })
    }
    /**
     *  Return configured AxiosInstance's request execution
     * 
     *  Before launch axios-request, launch url validation if invalid, throw Error else return AxiosResponses
     * 
     * @param apiRequest `ApiRequest` configs for each api service
     * @returns `Promise<AxiosResponse>` return promised response object
     * @memberof ApiClient
     */
    private axiosRequest(apiRequest: ApiRequest): Promise<AxiosResponse> {
        const { path, method, headers, body } = apiRequest
        // url validation
        if (!this.validateURL(this.client.defaults.baseURL + apiRequest.path)) throw new ApiError(ErrorCases.API.invalidURL)
        return this.client.request({
            url: path,
            method: method,
            headers: headers,
            data: body,
        })
    }

    /**
     * URL Validation using regex
     * 
     * @access private
     * @param url `string` full url to validate ( baseURL + url path )
     * @returns {boolean} validity of param url
     * @memberof ApiClient
     */
    private validateURL(url: string): boolean {
        const matched = url.match(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)
        return (matched !== null)
    }
}