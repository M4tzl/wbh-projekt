export interface CurrentUser {
    id?: number;
    retrievalFailed: boolean;
    loggedIn: boolean;
    userName?: string;
    enabled: boolean;
    isVermittler: boolean;
    isInteressent: boolean;
}
