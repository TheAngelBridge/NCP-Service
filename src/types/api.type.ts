
// -- API Scope
/**
 * @name ApiAuthKeyType
 * @alias NCPAuthKey
 */
 export type ApiAuthKeyType = {
    accessKey: string
    secretKey: string
}

// -- Service Scope
/**
 * @name SMSserviceAuthType
 * @memberof SMS
 * @alias SMSserviceAuth
 */
export type SMSserviceAuthType = {
    phone: string
    serviceId: string
}



// -- API Signature Scope
/**
 * @name ApiSignatureType
 * @memberof buildApiSignature
 * @alias ApiSignature
 */
 export type ApiSignatureType = {
    timestamp: string
    signature: string
}
  