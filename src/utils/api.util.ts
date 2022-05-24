import axios, { AxiosInstance, AxiosResponse, Method } from "axios";
import { ApiRequest } from "../interfaces/api.interface";


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
        if (!this.validateURL(this.client.defaults.baseURL + apiRequest.path)) console.log('error handling')
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