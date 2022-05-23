
// -- API Scope
/**
 * `Authentication` for Naver Cloud Platform API
 * 
 * @name ApiAuthKey
 * @member accessKey `string` private access key for account
 * @member secretKey `string` private secret key for account
 */
 export type ApiAuthKey = {
    accessKey: string
    secretKey: string
}

// -- Service Scope
/**
 * `Authentication` for SMS Service
 * 
 * @name SMSserviceAuth
 * @member phone `string` 
 */
export type SMSserviceAuth = {
    phone: string
    serviceId: string
}



// -- API Signature Scope
/**
 * `API Signature` for Naver Cloud Platform Services.
 * 
 * @name ApiSignature
 * @member timestamp `string` timestamp
 * @member signature `string` encrypted signature
 */
 export type ApiSignature = {
    timestamp: string
    signature: string
}
  