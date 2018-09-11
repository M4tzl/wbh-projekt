import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-yes-no-dialog',
    templateUrl: './yes-no-dialog.component.html',
    styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent {
    data: { text: string } = {text: ''};

    constructor(@Inject(MAT_DIALOG_DATA) private text: string,
                private dialogRef: MatDialogRef<YesNoDialogComponent>) {
        this.data = {text};
    }

    yes() {
        this.dialogRef.close(true);
    }

    no() {
        this.dialogRef.close(false);
    }

}
