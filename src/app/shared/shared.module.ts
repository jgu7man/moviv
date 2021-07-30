import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from './firebase.module';
import { MaterialModule } from './material.module';
import { MarxaModule } from './marxa.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FirebaseModule,
    MarxaModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    FirebaseModule,
    MaterialModule,
    MarxaModule,
    PipesModule,
    DirectivesModule,
  ]
})
export class SharedModule { }
