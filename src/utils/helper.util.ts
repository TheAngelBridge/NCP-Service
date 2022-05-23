import crypto from 'crypto'
import { ApiSignature, ApiAuthKey } from '../types/api.type';

/**
 * Build ApiSignature for Naver Cloud Platform.
 *  - NCP API Signature Builder
 *  - external API Doc : https://api.ncloud-docs.com/docs/en/common-ncpapi
 *  
 * @param {string} method - NCP API service method
 * @param {string} url - NCP API service url ( include query string )
 * @param {ApiAuthKey} authKey - NCP Account access key & secret key ( from portal or Sub Account )
 * 
 * @returns {ApiSignature}
 *         Caculated api signature for NCP services 
 *         Format : { Current_timestamp, Caculated_signature }
 */
export function buildApiSignature(
    method: string,
    url: string,
    authKey: ApiAuthKey
): ApiSignature {
    const { accessKey, secretKey } = authKey    // from portal
    const signParams: string[] = []
    const space = ' '   // one space
    const newLine = '\n'    // new line
    var timestamp = Date.now().toString()   // current timestamp (epoch)

    var hmac = crypto.createHmac('sha256', secretKey)
    hmac.update(method)
    hmac.update(space)
    hmac.update(url)
    hmac.update(newLine)
    hmac.update(timestamp)
    hmac.update(newLine)
    hmac.update(accessKey)
    
    const signature: string = hmac.digest('base64')

    return {
        timestamp,
        signature
    }
}