

export const PATH = {
    SMS: {
        sendMessage: (serviceId: string) => `/sms/v2/services/${serviceId}/messages`,
        lookupMessage: (serviceId: string, requestId: string) => `/sms/v2/services/${serviceId}/messages?requestId=${requestId}`,
        lookupResult: (serviceId: string, messageId: string) => `/sms/v2/services/${serviceId}/messages/${messageId}`,
        lookupReserved: (serviceId: string, reserveId: string) => `/sms/v2/services/${serviceId}/reservations/${reserveId}/reserve-status`,
        cancelReserved: (serviceId: string, reserveId: string) => `/sms/v2/services/${serviceId}/reservations/${reserveId}`,
        cancelScheduled: (serviceId: string, scheduleCode: string, messageId: string) => `/sms/v2/services/${serviceId}/schedules/${scheduleCode}/messages/${messageId}`,
    },
}