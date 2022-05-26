import { formatDate } from "../../../utils/shared.util"

export const SMSreserveTime = {
    fromDate: (date: Date) => formatDate(date),
    fromDateTimeLocal: (dateTimeLocal: String) => dateTimeLocal.replace('T', ' '),
}