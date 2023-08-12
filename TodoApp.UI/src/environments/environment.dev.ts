import { LogLevel, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const environment = {
  production: false,
  msalConfig: {
        auth: {
            clientId: "xyz",
            authority: "https://login.microsoftonline.com/xyz",
            knownAuthorities: ['xyz.com'],
            redirectUri:window.location.origin,
            postLogoutRedirectUri: window.location.origin
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage, 
            storeAuthStateInCookie: isIE,
        },
        system: {
            allowNativeBroker: false,
            loggerOptions: {
                loggerCallback(logLevel: LogLevel, message: string) {
                    console.log(message);
                },
                logLevel: LogLevel.Verbose,
                piiLoggingEnabled: false,
            },
        },
    },
    apiConfig: {
        scopes:{
            read: ["api://xyz/ReadAccess"],
            write: ["api://xyz/ReadAccess"],
        },
        uri: "http://localhost:5184/api/"
    },
    loginRequest:{
        scopes: []
    }
};
