import {NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomNgbDateAdapter extends NgbDateAdapter<string> {
    fromModel(value: string): NgbDateStruct {
        if(!value){
            return null;
        }

        const parts = value.split("-");
        return <NgbDateStruct> {
            day: Number(parts[2]),
            month: Number(parts[1]),
            year: Number(parts[0])
        };
    }

    toModel(date: NgbDateStruct): string {
        if(!date){
            return null;
        }

        return `${date.year}-${date.month}-${date.day}`;
    }

}
