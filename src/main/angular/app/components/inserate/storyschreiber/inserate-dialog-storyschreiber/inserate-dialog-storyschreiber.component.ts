import {Component} from '@angular/core';
import {InserateService} from '../../../../services/inserate.service';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-inserate-dialog-storyschreiber',
    templateUrl: './inserate-dialog-storyschreiber.component.html',
    styleUrls: ['./inserate-dialog-storyschreiber.component.css']
})
export class InserateDialogStoryschreiberComponent {
    data: {storyschreiber: string} = {storyschreiber: ''};

    constructor(public inserateService: InserateService, private dialogRef: MatDialogRef<InserateDialogStoryschreiberComponent>) {
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
