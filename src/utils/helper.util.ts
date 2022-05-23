import crypto from 'crypto'
import { ApiSignatureType, ApiAuthKeyType } from '../types/api.type';

/**
 * generateApiSignature
 *  - NCP API Signature Constructor
 *  - external API Doc : https://api.ncloud-docs.com/docs/en/common-ncpapi
 *  
 * @param {string} method - NCP API service method
 * @param {string} url - NCP API service url ( include query string )
 * @param {ApiAuthKeyType} authKey - NCP Account access key & secret key ( from portal or Sub Account )
 * 
 * @return {ApiSignatureReturnType}
 *         Caculated api signature for NCP services 
 *         Format : { Current_timestamp, Caculated_signature }
 */
export function buildApiSignature(
    method: string,
    url: string,
    authKey: ApiAuthKeyType
): ApiSignatureType {
    const { accessKey, secretKey } = authKey
    const signParams: string[] = []
    const space = ' '   // one space
    const newLine = '\n'    // new line
    var timestamp = Date.now().toString()   // current timestamp (epoch)

    var hmac = crypto.createHmac('sha256', secretKey)

    signParams.push(method);
    signParams.push(space);
    signParams.push(url);
    signParams.push(newLine);
    signParams.push(timestamp);
    signParams.push(newLine);
    signParams.push(accessKey);

    const signature: string = hmac.update(signParams.join('')).digest('base64')

    return {
        timestamp,
        signature
    }
}