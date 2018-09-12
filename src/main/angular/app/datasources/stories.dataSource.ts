import {DataSource} from "@angular/cdk/table";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, finalize, map} from "rxjs/operators";
import {CollectionViewer} from "@angular/cdk/collections";
import {StoriesResult} from "../model/stories-result";
import {StoriesService} from "../services/stories.service";
import {Story} from "../model/story";

export class StoriesDataSource implements DataSource<Story> {
    private storiesSubject = new BehaviorSubject<StoriesResult>(<StoriesResult>{});
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public inserateResult$ = this.storiesSubject.asObservable();

    constructor(private storiesService: StoriesService) {
    }

    loadOpenStories(pageIndex: number,
                    pageSize: number) {
        this.loadingSubject.next(true);

        this.storiesService.loadOpen(pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(result => this.storiesSubject.next(<StoriesResult> result));

    }

    loadStories(filter: {key: keyof Story, value: string}[],
                sortBy: string,
                sortDirection: string,
                pageIndex: number,
                pageSize: number) {

        this.loadingSubject.next(true);

        this.storiesService.loadAll(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(result => this.storiesSubject.next(<StoriesResult> result));

    }

    connect(collectionViewer: CollectionViewer): Observable<Story[]> {
        return this.storiesSubject.asObservable().pipe(
            map(result => result.stories)
        );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.storiesSubject.complete();
        this.loadingSubject.complete();
    }

}
