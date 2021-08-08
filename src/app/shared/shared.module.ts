import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from '../global/firebase.module';
import { MaterialModule } from '../global/material.module';
import { MarxaModule } from '../global/marxa.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';
import { NavigationPanelComponent } from './components/navigation-panel/navigation-panel.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavigationPanelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FirebaseModule,
    MarxaModule,
    PipesModule,
    DirectivesModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FirebaseModule,
    MaterialModule,
    MarxaModule,
    PipesModule,
    DirectivesModule,
    NavigationPanelComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
