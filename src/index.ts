import { AuthBuilder } from "./services/auth.service"
import { SENS } from "./services/sens/sens.index"
import { LookupMessageResponse, LookupResultResponse } from "./types/sms.type"

require('dotenv').config()

const auth = AuthBuilder.API(process.env.NCP_ACCESS!, process.env.NCP_SECRET!)
const smsAuth = AuthBuilder.SMS(process.env.SMS_PHONE!, process.env.SMS_SERVICE_ID!)

const smsClient = SENS.smsService(auth, smsAuth)

// smsClient.sendSMS('01040397930', '귀하는 아쉽게도 당첨이 안됫습니당')


// smsClient.lookupMessageRequest('0a4fc507f3d94dab8131670d0fbf151b')

smsClient.lookupMessageResult('0-ESA-202205-16121323-0')
.then(result => {
    console.log(result.data as LookupResultResponse)
})
.catch(err => {
    console.log(err)
})