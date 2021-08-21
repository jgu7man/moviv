import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxText } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { TalentAuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tabSelected: number = 0;
  codeSended: boolean = false;
  phoneCtrl: FormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])

  constructor (
    public auth: TalentAuthService,
    public focusMonitor: FocusMonitor
  ) {}

  ngOnInit(): void {
  }

  sendCode() {
    this.auth.login( this.phoneCtrl.value )
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
