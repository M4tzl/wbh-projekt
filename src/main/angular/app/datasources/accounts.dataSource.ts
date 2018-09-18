import {DataSource} from "@angular/cdk/table";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, finalize, map} from "rxjs/operators";
import {CollectionViewer} from "@angular/cdk/collections";
import {AccountUebersicht} from "../model/account-uebersicht";
import {AccountUebersichtResult} from "../model/account-uebersicht-result";
import {AdminService} from "../services/admin.service";

export class AccountsDataSource implements DataSource<AccountUebersicht> {
    private accountsSubject = new BehaviorSubject<AccountUebersichtResult>(<AccountUebersichtResult>{});
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public accountsResult$ = this.accountsSubject.asObservable();

    constructor(private adminService: AdminService) {
    }

    loadAccounts(username: string,
                 sortBy: string,
                 sortDirection: string,
                 pageIndex: number,
                 pageSize: number) {
        this.loadingSubject.next(true);

        this.adminService.loadAll(username, sortBy, sortDirection, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(result => this.accountsSubject.next(<AccountUebersichtResult> result));

    }

    connect(collectionViewer: CollectionViewer): Observable<AccountUebersicht[]> {
        return this.accountsSubject.asObservable().pipe(
            map(result => result.accounts)
        );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.accountsSubject.complete();
        this.loadingSubject.complete();
    }

}
