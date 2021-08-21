import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxText } from '@marxa/devkit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mt-code-form',
  templateUrl: './code-form.component.html',
  styleUrls: ['./code-form.component.scss']
})
export class CodeFormComponent implements OnInit, OnDestroy {

  codeForm: FormGroup = new FormGroup( {
    'one': new FormControl('', [Validators.required]),
    'two': new FormControl('', [Validators.required]),
    'three': new FormControl('', [Validators.required]),
    'four': new FormControl('', [Validators.required]),
    'five': new FormControl('', [Validators.required]),
    'six': new FormControl('', [Validators.required]),
  } )
  codeFormSubs: Subscription
  @Output() onSubmit: EventEmitter<string> = new EventEmitter()

  constructor (
    public text: MxText,
    public focusMonitor: FocusMonitor
  ) {
    this.codeFormSubs = this.codeForm.valueChanges.subscribe( data => {
      if ( this.codeForm.valid ) {
        let numbersMap = this.codeForm.value
        let code = ''
        Object.values( numbersMap ).forEach( val => { code = code+val } )
        this.onSubmit.emit( code )
      }
    })
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.codeFormSubs.unsubscribe()
  }

}
