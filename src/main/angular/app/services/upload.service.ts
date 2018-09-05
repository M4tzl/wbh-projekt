import {BildMetadaten} from "../model/bild-metadaten";
import {Observable} from "rxjs";

export interface UploadService {
    uploadImage(storyBild: BildMetadaten, file: File): Observable<BildMetadaten>;
}
