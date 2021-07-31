import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from '../global/firebase.module';
import { MaterialModule } from '../global/material.module';
import { MarxaModule } from '../global/marxa.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';
import { NavigationPanelComponent } from './components/navigation-panel/navigation-panel.component';
import { RouterModule } from '@angular/router';



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
    RouterModule
  ],
  exports: [
    FirebaseModule,
    MaterialModule,
    MarxaModule,
    PipesModule,
    DirectivesModule,
    NavigationPanelComponent,
  ]
})
export class SharedModule { }
