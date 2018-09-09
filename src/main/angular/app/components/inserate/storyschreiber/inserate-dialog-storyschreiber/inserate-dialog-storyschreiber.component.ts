import { Component, OnInit, Inject } from '@angular/core';
import { Inserat } from '../../../../model/inserat';
import { InserateService } from '../../../../services/inserate.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InserateStatusComponent } from '../../status/inserate-status/inserate-status.component';

@Component({
  selector: 'app-inserate-dialog-storyschreiber',
  templateUrl: './inserate-dialog-storyschreiber.component.html',
  styleUrls: ['./inserate-dialog-storyschreiber.component.css']
})
export class InserateDialogStoryschreiberComponent implements OnInit {


    inserat:Inserat;

    constructor(public inserateService: InserateService, private dialogRef: MatDialogRef<InserateStatusComponent>,
        @Inject(MAT_DIALOG_DATA) {inserat }){
        this.inserat = inserat;
        }

    ngOnInit() {

    }


    save() {


        //this.inserateService.publish(this.inserat);
        this.dialogRef.close(this.inserat);
    }

    close() {
        this.dialogRef.close();
    }

}
