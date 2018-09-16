import {BildMetadaten} from "../model/bild-metadaten";
import {Observable} from "rxjs";
import {BildUploadProgress} from "../model/bild-upload-progress";

export interface UploadService {
    uploadImage(storyBild: BildMetadaten, file: File): Observable<BildUploadProgress>;
}
