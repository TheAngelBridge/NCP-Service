

export type SendMessageRequest = {
    type: string
    from: string,
    content: string,
    messages: Message[]
    // Optional
    // 
    subject?: string
    contentType?: string
    countryCode?: string
    // 
    files?: MMS_File[]
    //
    reserveTime?: string
    reserveTimeZone?: string
    scheduleCode?: string
    
}
export type Message = {
    to: string
    subject?: string
    content?: string
}
export type MMS_File = {
    name: string
    body: string
}

/**
 * `Response` for **Send Messages**
 * 
 * @name SendMessageResponse
 * @member requestId `string` unique request id
 * @member requestTime `string` datetime
 * @member statusCode `string` api status code based on http
 * @member statusName `string` **success** or **fail**
 */
export type SendMessageResponse = {
    requestId: string
    requestTime: string
    statusCode: string
    statusName: string
}

/**
 * `Response` for **Lookup requested messages**
 * 
 * @name LookupMessageResponse
 * @member requestId `string` unique request id
 * @member statusCode `string` api status code based on http
 * @member statusName `string` **success** or **reserved**(waiting for sent) or **scheduled**(waiting for queueing) or **fail**
 * @member messages `MessageRequestData[]` individual message data included in **request id**
 */
export type LookupMessageResponse = {
    requestId: string
    statusCode: string
    statusName: string
    messages: MessageRequestData[]
}
/**
 * `Data Object` for representing **Send Message Request**
 * 
 * @name MessageRequestData
 * @member messageId `string` unique message id
 * @member requestTime `string` datetime
 * @member contentType `string` **COMM**(common message) or **AD**(advertising message)
 * @member countryCode `string` country code
 * @member from `string` phone number that sent the message
 * @member to `string` phone number that received the message
 */
export type MessageRequestData = {
    messageId: string
    requestTime: string
    contentType: string
    countryCode: string
    from: string
    to: string
}