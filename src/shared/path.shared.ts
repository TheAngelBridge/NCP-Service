

export const PATH = {
    SMS: {
        sendMessage: (serviceId: string) => `/services/${serviceId}/messages`,
        lookupMessage: (serviceId: string, requestId: string) => `/services/${serviceId}/messages?requestId=${requestId}`,
        lookupResult: (serviceId: string, messageId: string) => `/services/${serviceId}/messages/${messageId}`,
        lookupReserved: (serviceId: string, reserveId: string) => `/services/${serviceId}/reservations/${reserveId}/reserve-status`,
        cancelReserved: (serviceId: string, reserveId: string) => `/services/${serviceId}/reservations/${reserveId}`,
        cancelScheduled: (serviceId: string, scheduleCode: string, messageId: string) => `/services/${serviceId}/schedules/${scheduleCode}/messages/${messageId}`,
    },
}