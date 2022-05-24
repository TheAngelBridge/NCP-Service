import { formatDate } from "../../../utils/shared.util"


export const SMSscheduleCode = {
    Every: {
        AM: (hour: string) => `every-am-${hour}`,
        PM: (hour: string) => `every-pm-${hour}`,
    }
}

export const SMSreserveTime = {
    fromDate: (date: Date) => formatDate(date),
    fromDateTimeLocal: (dateTimeLocal: String) => dateTimeLocal.replace('T', ' '),
}