import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {CurrentUser} from "../model/current-user";

@Injectable()
export class SecurityService {

    private _currentUser = new BehaviorSubject<CurrentUser>(<CurrentUser> {
        loggedIn: false
    });

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

    logout(): Observable<any> {
        return this.http.post('/api/logout', {})
            .pipe(
                switchMap(user => this.authenticate())
            );
    }

    private mapToCurrentUser(resp): CurrentUser {
        return resp && 'username' in resp
            ? <CurrentUser> {
                loggedIn: true,
                userName: resp.username
            }
            : <CurrentUser> {
                loggedIn: false
            };
    }
}
