import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {
    format(date: NgbDateStruct): string {
        if(!date || !date.day || !date.month || !date.year){
            return '';
        }
        return date.day + "." + date.month + "." + date.year;
    }

    parse(value: string): NgbDateStruct {
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

}
