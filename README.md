# NCP-Client

An easy-to-use typescript wrapper for [Naver Cloud Platform API](https://api.ncloud-docs.com/docs/en/common-ncpapi). With VersionUps, API wrappers will be added and updates.

**Notice )** 
- This project is created in TheAngeBridge, Inc.
- Always welcome contributions for user's Productivity

## Table of Contents

- [Dependency](#dependency)
- [Installation](#installation)
- [Types](#types)
- [API Response Statuses](#api-response-statuses)
- [Current Support](#current-support)

- [Credit](#credit)
- [License](#license)



## Dependency

- axios



## Installation

with npm

~~~bash
$ npm install ncp-client
~~~



## Types 

**Note)** Introduced types are what you have to create or handle in use *NCP-Client*

Based on Typescript's type alias, several types for api are declared. At this step, you can only show what you will use at each usage.

**Common & Authentification**

~~~typescript
// `Authentication` for Naver Cloud Platform API
type AuthKey = {
  accessKey: string
  secretKey: string
}

// `Authentication` for SMS Service
type AuthKey = {
  phone: string
  serviceId: string
}

// Common return value for all NCP api request
type ApiClientResponse<T> = {
    // not null, you can check is request successful
    isSuccess: boolean
    // if error occured, provide error references
    errorCode?: string
    errorMessage?: string
    // if request is success, provide api response as data
    data?: T
}
~~~



## Client Error Types

Client Response types preprocessed by NCP Client

|   HTTP Status   |            Desc             |
| :-------------: | :-------------------------: |
|      API000     |         Invalid URL         |
|      API001     | Client's axios config error |
|      API100     |   HTTP errors from NCP API  |
|      API101     |      Unexpected Response    |
|      API102     |   No Response From Server   |
|      API200     |      Yet Unhandled error    |



## Current Support

#### (SENS) SMS API v2 `Cover All Services`

- **Send SMS / LMS / MMS**
- **Support Advertise, Reserve, Schedule**
- **Lookup Message Request's status**
- **Lookup Each Message's Result**
- **Lookup Reserved Message**
- **Cancel Reserved Message**
- **Cancel Scheduled Message**

## Credits

- [TheAngelBridge, Inc](https://github.com/TheAngelbridge)
- [AlenHeo](https://github.com/AlenHeo)



## License

[ISC License](https://github.com/TheAngelBridge/NCP_Client/blob/master/LICENSE)
