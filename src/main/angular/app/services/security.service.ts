import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, ReplaySubject, throwError} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {CurrentUser} from "../model/current-user";
import {Vermittler} from "../model/vermittler";
import {Credentials} from "../model/credentials";

@Injectable()
export class SecurityService {

    private _currentUser = new ReplaySubject<CurrentUser>(1);

    constructor(private http: HttpClient) {
        this.authenticate().subscribe();
    }

    get currentUser(): Observable<CurrentUser> {
        return this._currentUser.asObservable();
    }

    authenticate(credentials?: Credentials): Observable<CurrentUser> {
        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        return this.http.get<any>('/api/user', {headers: headers})
            .pipe(
                catchError(err => {
                    if(err.status && err.status >= 500) {
                        this._currentUser.next(<CurrentUser> {
                            retrievalFailed: true,
                            loggedIn: false,
                            isInteressent: false,
                            isVermittler: false
                        });
                    }

                    return throwError(err);
                }),
                map(this.mapToCurrentUser),
                tap(user => this._currentUser.next(user))
            );
    }

    registerInteressent(credentials: Credentials): Observable<CurrentUser> {
        return this.http.post<any>('/api/register/interessent', credentials)
            .pipe(
                switchMap(user => this.authenticate(credentials))
            );
    }

    registerVermittler(credentials: Credentials, vermittler: Vermittler): Observable<CurrentUser> {
        return this.http.post<any>('/api/register/vermittler', {
            username: credentials.username, password: credentials.password, vermittler
        })
            .pipe(
                switchMap(user => this.authenticate(credentials))
            );
    }

    loadVermittler(): Observable<Vermittler> {
        return this.http.get<Vermittler>('/api/user/vermittler');
    }

    initiatePasswordReset(credentials: Credentials): Observable<CurrentUser> {
        return this.http.post<any>('/api/password/reset', credentials);
    }

    resetPassword(password: string, token: string): Observable<CurrentUser> {
        return this.http.post<any>(`/api/password/reset/${token}`, {password}).pipe(
            map(this.mapToCurrentUser),
            switchMap(user => this.authenticate({username: user.userName, password: password}))
        );
    }

    logout(): Observable<any> {
        return this.http.post('/api/logout', {})
            .pipe(
                switchMap(user => this.authenticate())
            );
    }

    private mapToCurrentUser(resp): CurrentUser {
        return resp ? <CurrentUser> {
                retrievalFailed: false,
                loggedIn: true,
                userName: resp.username,
                enabled: resp.enabled,
                isInteressent: resp.roles.map(r => r.name).indexOf('INTERESSENT') > -1,
                isVermittler: resp.roles.map(r => r.name).indexOf('VERMITTLER') > -1
            }
            : <CurrentUser> {
                retrievalFailed: false,
                loggedIn: false,
                isInteressent: false,
                isVermittler: false
            };
    }
}
