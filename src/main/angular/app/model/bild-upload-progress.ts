import {BildMetadaten} from "./bild-metadaten";

export interface BildUploadProgress {
    finished: boolean;
    progress: number;
    result: BildMetadaten;
}

