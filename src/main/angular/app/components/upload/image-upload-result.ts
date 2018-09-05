import {BildMetadaten} from "../../model/bild-metadaten";

export interface ImageUploadResult {
    oldImage: BildMetadaten;
    newImage: BildMetadaten;
}
