import {Component, OnInit} from "@angular/core";
import {InserateService} from "../../../services/inserate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Inserat} from "../../../model/inserat";
import {Observable} from "rxjs";
import {BreedService} from "../../../services/breed.service";
import {BildMetadaten} from "../../../model/bild-metadaten";
import {map, mergeMap, tap} from "rxjs/operators";
import {ImageUploadResult} from "../../upload/image-upload-result";
import {Constants} from "../../../model/constants";

// TODO: Die Logik in dieser Komponente ist mittlerweile leicht verworren. Tests und ein Refactoring wären gut...
@Component({
    selector: 'app-inserate-detail',
    templateUrl: './inserate-edit.component.html',
    styleUrls: ['./inserate-edit.component.scss']
})
export class InserateEditComponent implements OnInit {
    inserat: Inserat = <Inserat>{};
    rassen: Observable<string[]>;
    images: BildMetadaten[] = [];
    errorOccured: boolean;
    constants: Constants = new Constants();

    constructor(public inserateService: InserateService,
                private breedService: BreedService,
                private route: ActivatedRoute,
                private router: Router) {
    }


    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.inserateService.load(id)
                .pipe(
                    tap(result => this.inserat = result),
                    map(inserat => inserat.id),
                    mergeMap(inseratId => this.inserateService.loadImages(inseratId))
                )
                .subscribe(result => {
                    this.images = result;
                    this.images.push(this.placeholderInseratBild(this.inserat));
                });
        }

        this.rassen = this.breedService.loadAll();
    }

    onWeiter(form) {
        if (form.valid) {
            this.inserateService.save(this.inserat)
                .pipe(
                    tap(inserat => this.inserat = inserat),
                    tap(inserat => {
                        if (this.images.length === 0) {
                            this.images = [this.placeholderInseratBild(inserat)]
                        }
                    })
                )
                .subscribe(result => this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: {
                        ...this.route.snapshot.queryParams,
                        wizard: '2',
                    }
                }),
                    err => this.errorOccured = true);
        }
    }

    resetErrors(): void {
        this.errorOccured = false;
    }

    private placeholderInseratBild(inserat) {
        return <BildMetadaten> {entityId: inserat.id};
    }

    onSubmit() {
        this.inserateService.publish(this.inserat)
            .subscribe(result => this.router.navigateByUrl("/inserate/manage"));
    }

    get wizardPage(): number {
        return this.route.snapshot.queryParams['wizard'] || 1;
    }

    goBack() {
        this.router.navigateByUrl("/inserate/manage");
    }

    backToWizardOne() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                ...this.route.snapshot.queryParams,
                wizard: '1',
            }
        });
    }

    onImageUploaded(event: ImageUploadResult) {
        if (!event.oldImage.id) {
            this.images.push(this.placeholderInseratBild(this.inserat));
        }
    }

    get maxDate(): any {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth(),
            day: yesterday.getDate()
        }
    }
}
