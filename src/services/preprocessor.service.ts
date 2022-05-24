import { SendMessageResponse } from "../types/sms.type";

export const SupportedService = {
    // SENS
    // SMS
    SMS: {
        sendMessage: 'SMS:SendMessage',
        lookupRequest: 'SMS:LookupRequest',
        lookupResponse: 'SMS:LookupResult',
        lookupReservedMessage: 'SMS:LookupReservedMessage',
        cancelReservedMessage: 'SMS:CancelReservedMessage',
        cancelScheduleMessage: 'SMS:CancelScheduleMessage',
    }

}

export class Preprocessor {
    

    // SendMessage
    sendMessage(data: SendMessageResponse) {
        
    }
}