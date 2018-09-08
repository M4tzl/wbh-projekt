import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    data: any = {};

  constructor( private location: Location,) { }

  ngOnInit():void {

}
onSubmit(form){
    if (form.valid) {
        console.log("Anmeldung durchführen:" + form);
    }
}
resetPW(form){

    console.log("PW Reset durchführen:" + form);

}
  goBack(): void {
    this.location.back();
}
}
