import { Component, OnInit } from '@angular/core';
import { ManagerModel } from 'src/app/models/managers.model';
import { TalentAuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  tabSelected: number = 0;
  codeSended: boolean = false;
  celular: string = ''

  constructor (
    public auth: TalentAuthService,
  ) {}

  ngOnInit(): void {
  }

  onRegist(manager: ManagerModel) {
    this.auth.onRegist( manager )
    this.celular = manager.celular
    this.codeSended = true
    this.tabSelected = 1
  }

  nextInput( event: any ) {
    console.log( event )
    let element;
    if (event.code !== 'Backspace')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    console.log( element )
    if(element == null)
      return;
    else
      element.focus();
  }

  catchVerificationCode(code: string) {
    this.auth.catchVerificationCode$.next( code )
  }



}
