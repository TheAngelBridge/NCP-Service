

export const PATH = {
    SMS: {
        sendMessage: (serviceId: string) => `/services/${serviceId}/messages`,
        lookupMessage: (serviceId: string, requestId: string) => `/services/${serviceId}/messages?requestId=${requestId}`,
        lookupResult: (serviceId: string, messageId: string) => `/services/${serviceId}/messages/{messageId}`
    },
}