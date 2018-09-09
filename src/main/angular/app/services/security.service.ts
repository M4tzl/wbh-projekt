import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {CurrentUser} from "../model/current-user";
import {Vermittler} from "../model/vermittler";

@Injectable()
export class SecurityService {

    private _currentUser = new ReplaySubject<CurrentUser>(1);

    constructor(private http: HttpClient) {
        this.authenticate().subscribe();
    }

    get currentUser(): Observable<CurrentUser> {
        return this._currentUser.asObservable();
    }

    authenticate(credentials?: { username: string, password: string }): Observable<CurrentUser> {
        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        return this.http.get<any>('/api/user', {headers: headers})
            .pipe(
                map(this.mapToCurrentUser),
                tap(user => this._currentUser.next(user))
            );
    }

    registerInteressent(username: string, password: string): Observable<CurrentUser> {
        return this.http.post<any>('/api/register/interessent', {username, password})
            .pipe(
                switchMap(user => this.authenticate({username, password}))
            );
    }
    registerVermittler(username: string, password: string, vermittler: Vermittler): Observable<CurrentUser> {
        return this.http.post<any>('/api/register/vermittler', {username, password, vermittler})
            .pipe(
                switchMap(user => this.authenticate({username, password}))
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
                loggedIn: true,
                userName: resp.username,
                isInteressent: resp.roles.map(r => r.name).indexOf('INTERESSENT') > -1,
                isVermittler: resp.roles.map(r => r.name).indexOf('VERMITTLER') > -1
            }
            : <CurrentUser> {
                loggedIn: false,
                isInteressent: false,
                isVermittler: false
            };
    }
}
