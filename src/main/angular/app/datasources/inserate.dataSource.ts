import {DataSource} from "@angular/cdk/table";
import {BehaviorSubject, Observable, of} from "rxjs";
import {InserateService} from "../services/inserate.service";
import {catchError, finalize, map} from "rxjs/operators";
import {CollectionViewer} from "@angular/cdk/collections";
import {InseratUebersichtResult} from "../model/inserat-uebersicht-result";
import {InseratUebersicht} from "../model/inserat-uebersicht";
import {Inserat} from "../model/inserat";

export class InserateDataSource implements DataSource<InseratUebersicht> {
    private inserateSubject = new BehaviorSubject<InseratUebersichtResult>(<InseratUebersichtResult>{});
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public inserateResult$ = this.inserateSubject.asObservable();

    constructor(private inserateService: InserateService) {
    }

    loadInserate(filter:{key: keyof Inserat, value: string}[],
                sortBy:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.inserateService.loadAll(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(inseratResult => this.inserateSubject.next(<InseratUebersichtResult> inseratResult));

    }

    connect(collectionViewer: CollectionViewer): Observable<InseratUebersicht[]> {
        return this.inserateSubject.asObservable().pipe(
            map(result => result.inserate)
        );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.inserateSubject.complete();
        this.loadingSubject.complete();
    }

}
