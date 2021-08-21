import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerModel } from 'src/app/models/managers.model';

@Component({
  selector: 'mt-manager-form',
  templateUrl: './manager-form.component.html',
  styleUrls: ['./manager-form.component.scss']
})
export class ManagerFormComponent implements OnInit {

  managerForm: FormGroup = new FormGroup( {
    celular: new FormControl( '', [
      Validators.required,
      Validators.minLength( 10 ),
      Validators.maxLength( 10 )
    ] ),
    first_name: new FormControl( '', [ Validators.required ] ),
    last_name: new FormControl( '', [ Validators.required ] ),
    email: new FormControl( '', [ Validators.required, Validators.email ])
  } );

  @Output() onSubmit: EventEmitter<ManagerModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    const {celular, first_name, last_name, email} = this.managerForm.getRawValue()
    let manager: ManagerModel = new ManagerModel(
      celular, first_name, last_name, email
    );
    this.onSubmit.emit(manager);
  }

}
