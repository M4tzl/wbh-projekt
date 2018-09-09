import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inserat } from '../../../../model/inserat';
import {InseratStatus} from "../../../../model/inserat-status";
import { InserateService } from '../../../../services/inserate.service';

@Component({
  selector: 'app-inserate-status',
  templateUrl: './inserate-status.component.html',
  styleUrls: ['./inserate-status.component.css']
})
export class InserateStatusComponent implements OnInit {


    inserat:Inserat;

    constructor(public inserateService: InserateService, private dialogRef: MatDialogRef<InserateStatusComponent>,
        @Inject(MAT_DIALOG_DATA) {inserat }){
        this.inserat = inserat;
        }

    ngOnInit() {

    }


    save() {

        this.inserat.status = "INAKTIV";
        this.inserateService.publish(this.inserat);
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

}
