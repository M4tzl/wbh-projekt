import {Component} from '@angular/core';
import {InserateService} from '../../../../services/inserate.service';
import {MatDialogRef} from '@angular/material';

export interface AssignStoryschreiberResult {
    assigned: boolean;
    storyschreiber: string;
}

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
            this.dialogRef.close(<AssignStoryschreiberResult> {assigned: true, storyschreiber: this.data.storyschreiber});
        }
    }

    close() {
        this.dialogRef.close(<AssignStoryschreiberResult> {assigned: false});
    }

}
