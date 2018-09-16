import {NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomNgbDateAdapter extends NgbDateAdapter<string> {
    fromModel(value: string): NgbDateStruct {
        if(!value){
            return null;
        }

        const parts = value.split(".");
        return <NgbDateStruct> {
            day: Number(parts[0]),
            month: Number(parts[1]),
            year: Number(parts[2])
        };
    }

    toModel(date: NgbDateStruct): string {
        if(!date){
            return null;
        }

        return `${this.pad(date.day)}.${this.pad(date.month)}.${date.year}`;
    }

    private pad(n: number): string{
        return n < 10 ? '0' + n : ''+n;
    }
}
