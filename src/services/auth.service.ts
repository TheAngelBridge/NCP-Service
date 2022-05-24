import { ApiAuthKey, SMSserviceAuth } from "../types/api.type";


/**
 * `Authentication Builder` for NCP Services
 * 
 * @name AuthBuilder
 */
export const AuthBuilder = {
    // API Scope
    /**
     * 
     * @param accessKey 
     * @param secretKey 
     * @returns 
     * Naver Cloud Platform API account authentication
     */
    API: (accessKey: string, secretKey: string): ApiAuthKey => ({ accessKey, secretKey }),
    // Service Scope
    /**
     * 
     * @param phone 
     * @param serviceId 
     * @returns 
     * SMS Service param authentication
     */
    SMS: (phone: string, serviceId: string): SMSserviceAuth => ({ phone, serviceId }),
}