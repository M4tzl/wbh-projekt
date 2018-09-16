import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
    selector: '[past][formControlName],[past][formControl],[past][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PastValidator), multi: true }
    ]
})
export class PastValidator implements Validator {
    validate(c: AbstractControl): { [key: string]: any } {
        let val = c.value;

        if(val) {
            const parts = val.split('.');
            const input = new Date(parts[2], parts[1]-1, parts[0]); // Note: months are 0-based

            const now = new Date();
            now.setHours(0, 0, 0, 0);
            input.setHours(0, 0, 0, 0);

            if (input >= now) {
                return {
                    'past': 'Das Datum muss in der Vergangenheit liegen'
                };
            }
        }
        return null;
    }
}
