import {Component, OnInit, Inject} from '@angular/core';
import {Inserat} from '../../../../model/inserat';
import {InserateService} from '../../../../services/inserate.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {InserateStatusComponent} from '../../status/inserate-status/inserate-status.component';

@Component({
    selector: 'app-inserate-dialog-storyschreiber',
    templateUrl: './inserate-dialog-storyschreiber.component.html',
    styleUrls: ['./inserate-dialog-storyschreiber.component.css']
})
export class InserateDialogStoryschreiberComponent {
    data: {storyschreiber: string} = {storyschreiber: ''};

    constructor(public inserateService: InserateService, private dialogRef: MatDialogRef<InserateStatusComponent>) {
    }

    save(form) {
        if(form.valid) {
            this.dialogRef.close(this.data.storyschreiber);
        }
    }

    close() {
        this.dialogRef.close();
    }

}
