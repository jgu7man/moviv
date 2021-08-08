import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TalentAuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tabSelected: number = 0;
  codeCtrl: FormControl = new FormControl('', [Validators.required])
  constructor (
    public auth: TalentAuthService
  ) { }

  ngOnInit(): void {
  }

  onCode() {
    this.auth.onRegist(this.codeCtrl.value)
  }


}
