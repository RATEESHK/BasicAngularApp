// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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
        scopes:["api://xyz/xyz"],
        uri: "http://localhost:5184/api/"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
