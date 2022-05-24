import { ApiAuthKey, SMSserviceAuth } from "../../types/api.type";
import { SMS } from "./sms/sms.service";




export class SENS {
    


    public static smsService(
        authKey: ApiAuthKey,
        smsAuth: SMSserviceAuth
    ): SMS { 
        return new SMS(authKey, smsAuth)
    }
}