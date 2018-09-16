import {Component, EventEmitter, Input, Output} from "@angular/core";
import {BildMetadaten} from "../../model/bild-metadaten";
import {filter, map, tap} from "rxjs/operators";
import {ImageUploadResult} from "./image-upload-result";
import {UploadService} from "../../services/upload.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
    @Input()
    bildMetadaten: BildMetadaten = <BildMetadaten> {};

    @Input()
    uploadService: UploadService;

    @Output()
    imageUploaded: EventEmitter<ImageUploadResult> = new EventEmitter();

    uploading: boolean;
    uploadProgress: number;

    get imageSource(): string {
        return this.bildMetadaten.imageUrl || "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22208%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20208%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_165a0a7da07%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A11pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_165a0a7da07%22%3E%3Crect%20width%3D%22208%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2280.953125%22%20y%3D%22117.3%22%3EUpload%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
    }

    handleFileInput(files: FileList) {
        const fileToUpload = files.item(0);

        this.uploading = true;
        this.uploadProgress = 0;

        this.uploadService.uploadImage(this.bildMetadaten, fileToUpload)
            .pipe(
                tap(event => this.uploadProgress = event.progress),
                filter(event => event.finished),
                map(event => event.result),
                tap(result => this.imageUploaded.emit(<ImageUploadResult>{
                    oldImage: this.bildMetadaten,
                    newImage: result
                })),
                tap(result => this.uploading = false)
            )
            .subscribe(result => this.bildMetadaten = result);
    }



}


