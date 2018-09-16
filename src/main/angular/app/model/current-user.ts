export interface CurrentUser {
    retrievalFailed: boolean;
    loggedIn: boolean;
    userName?: string;
    enabled: boolean;
    isVermittler: boolean;
    isInteressent: boolean;
}
