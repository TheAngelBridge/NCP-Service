import { Method } from "axios";
import { ApiRequest, ApiResponse } from "../../../interfaces/api.interface";
import { BaseUrl } from "../../../shared/baseurl.shared";
import { PATH } from "../../../shared/path.shared";
import { ApiAuthKey, SMSserviceAuth } from "../../../types/api.type";
import { LookupMessageResponse, LookupReservedMessageResponse, LookupResultResponse, Message, MMS_File, SendMessageRequest, SendMessageResponse } from "../../../types/sms.type";
import { ApiClient } from "../../../utils/api.util";
import { buildApiSignature } from "../../../utils/helper.util";

enum MessageType {
    SMS = 'SMS',
    LMS = 'LMS',
    MMS = 'MMS',
}
enum ContentType {
    COMMON = 'COMM',
    ADVERTISE = 'AD',
}

export class SMS {
    /**
     * The ApiClient for working with http request
     * 
     * @access private 
     * @type `ApiClient`
     * @memberof SMS
     */
    private client: ApiClient
    /**
     * Naver Cloud Platform account access Key for API authentication
     * 
     * @access private 
     * @type `ApiAuthKey`
     * @memberof SMS
     */
    private authKey: ApiAuthKey
    /**
     * Registered phoneNumber, serviceId for using SMS API
     * 
     * @access private 
     * @type `SMSserviceAuthType`
     * @memberof SMS
     */
    private smsAuth: SMSserviceAuth

    private requestFactory: SMSRequestFactory

    /**
     * Creates an instance of SMS service agent.
     * 
     * @param authKey `ApiAuthKey` NCP API authentication data for using API
     * @param smsAuth `SMSserviceAuth` Service identification for using SMS Service
     * @memberof SMS
     */
    constructor(
        authKey: ApiAuthKey,
        smsAuth: SMSserviceAuth,
    ) {
        this.authKey = authKey
        this.smsAuth = smsAuth
        this.client = new ApiClient(BaseUrl.SENS.SMS)
        this.requestFactory = new SMSRequestFactory(authKey, smsAuth)
    }

    // COMMON Messages
    public async sendSMS(to: string|string[], content: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.SendMessage(MessageType.SMS, ContentType.COMMON, to, content)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async sendLMS(to: string|string[], subject: string, content: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.SendMessage(MessageType.LMS, ContentType.COMMON, to, subject, content)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async sendMMS(to: string|string[], subject: string, content: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.SendMessage(MessageType.MMS, ContentType.COMMON, to, subject, content)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    // ADVERTISING Messages
    public async sendAdSMS(to: string|string[], content: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.SendMessage(MessageType.SMS, ContentType.ADVERTISE, to, content)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async sendAdLMS(to: string|string[], subject: string, content: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.SendMessage(MessageType.LMS, ContentType.ADVERTISE, to, subject, content)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async sendAdMMS(to: string|string[], subject: string, content: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.SendMessage(MessageType.MMS, ContentType.ADVERTISE, to, subject, content)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    // Reserve Message
    public async reserveSMS(to: string|string[], content: string, reserveTime: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.ReserveMessage(MessageType.SMS, ContentType.COMMON, to, content, reserveTime)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async reserveLMS(to: string|string[], subject: string, content: string, reserveTime: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.ReserveMessage(MessageType.LMS, ContentType.COMMON, to, subject, content, reserveTime)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async reserveMMS(to: string|string[], subject: string, content: string, reserveTime: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.ReserveMessage(MessageType.MMS, ContentType.COMMON, to, subject, content, reserveTime)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    // Schedule Message
    public async scheduleSMS(to: string|string[], content: string, scheduleCode: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.ScheduleMessage(MessageType.SMS, ContentType.COMMON, to, content, scheduleCode)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async scheduleLMS(to: string|string[], subject: string, content: string, scheduleCode: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.ScheduleMessage(MessageType.LMS, ContentType.COMMON, to, subject, content, scheduleCode)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async scheduleMMS(to: string|string[], subject: string, content: string, scheduleCode: string): Promise<ApiResponse<SendMessageResponse>> {
        const apiRequest = this.requestFactory.ScheduleMessage(MessageType.MMS, ContentType.COMMON, to, subject, content, scheduleCode)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    // Lookup Methods
    public async lookupMessageRequest(requestId: string): Promise<ApiResponse<LookupMessageResponse>> {
        const apiRequest = this.requestFactory.LookupMessageRequest(requestId)
        return this.client.request<LookupMessageResponse>(apiRequest)
    }
    public async lookupMessageResult(messageId: string): Promise<ApiResponse<LookupResultResponse>> {
        const apiRequest = this.requestFactory.LookupMessageResult(messageId)
        return this.client.request<LookupResultResponse>(apiRequest)
    }
    public async lookupReservedMessage(reserveId: string): Promise<ApiResponse<LookupReservedMessageResponse>> {
        const apiRequest = this.requestFactory.LookupReservedMessage(reserveId)
        return this.client.request<LookupReservedMessageResponse>(apiRequest)
    }
    public async cancelReservedMessage(reserveId: string): Promise<ApiResponse<null>> {
        const apiRequest = this.requestFactory.CancelReservedMessage(reserveId)
        return this.client.request<null>(apiRequest)
    }
    public async cancelScheduledMessage(scheduleCode: string, messageId: string): Promise<ApiResponse<null>> {
        const apiRequest = this.requestFactory.CancelScheduledMessage(scheduleCode, messageId)
        return this.client.request<null>(apiRequest)
    }
}

class SMSRequestFactory {
    private authKey: ApiAuthKey
    private smsAuth: SMSserviceAuth
    constructor(authKey: ApiAuthKey, smsAuth: SMSserviceAuth) {
        this.authKey = authKey
        this.smsAuth = smsAuth
    }
    private buildSendMessageRequest(): ApiRequest {
        const path = PATH.SMS.sendMessage(this.smsAuth.serviceId)
        const method: Method = 'POST'
        const { timestamp, signature } = buildApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public SendMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string,
        subject?: string, files?: MMS_File[], 
    ): ApiRequest {
        const request = this.buildSendMessageRequest()
        const messages: Message[] = Array.isArray(to) ? to.map(x => ({ to: x })) : [{to: to}]
        const body: SendMessageRequest = {
            type: type,
            contentType: contentType,
            countryCode: "82",
            from: this.smsAuth.phone,
            subject: subject,
            content: content,
            messages: messages,
            files: files,
        }
        request.body = body
        return request
    }
    public ReserveMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string, reserveTime: string,
        subject?: string, files?: MMS_File[], 
    ): ApiRequest {
        const request = this.buildSendMessageRequest()
        const messages: Message[] = Array.isArray(to) ? to.map(x => ({ to: x })) : [{to: to}]
        const body: SendMessageRequest = {
            reserveTime: reserveTime,
            type: type,
            contentType: contentType,
            countryCode: "82",
            from: this.smsAuth.phone,
            subject: subject,
            content: content,
            messages: messages,
            files: files,
        }
        request.body = body
        return request
    }
    public ScheduleMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string, scheduleCode: string,
        subject?: string, files?: MMS_File[], 
    ): ApiRequest {
        const request = this.buildSendMessageRequest()
        const messages: Message[] = Array.isArray(to) ? to.map(x => ({ to: x })) : [{to: to}]
        const body: SendMessageRequest = {
            scheduleCode: scheduleCode,
            type: type,
            contentType: contentType,
            countryCode: "82",
            from: this.smsAuth.phone,
            subject: subject,
            content: content,
            messages: messages,
            files: files,
        }
        request.body = body
        return request
    }
    public LookupMessageRequest(requestId: string): ApiRequest {
        const path = PATH.SMS.lookupMessage(this.smsAuth.serviceId, requestId)
        const method: Method = 'GET'
        const { timestamp, signature } = buildApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public LookupMessageResult(messageId: string): ApiRequest {
        const path = PATH.SMS.lookupResult(this.smsAuth.serviceId, messageId)
        const method: Method = 'GET'
        const { timestamp, signature } = buildApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public LookupReservedMessage(reserveId: string): ApiRequest {
        const path = PATH.SMS.lookupReserved(this.smsAuth.serviceId, reserveId)
        const method: Method = 'GET'
        const { timestamp, signature } = buildApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public CancelReservedMessage(reserveId: string): ApiRequest {
        const path = PATH.SMS.cancelReserved(this.smsAuth.serviceId, reserveId)
        const method: Method = 'DELETE'
        const { timestamp, signature } = buildApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public CancelScheduledMessage(scheduleCode: string, messageId: string): ApiRequest {
        const path = PATH.SMS.cancelScheduled(this.smsAuth.serviceId, scheduleCode, messageId)
        const method: Method = 'DELETE'
        const { timestamp, signature } = buildApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
}