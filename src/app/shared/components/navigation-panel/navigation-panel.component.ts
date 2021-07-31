import { Input } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MxResponsive } from '@marxa/devkit';
import { iWorkspace, Workspace } from 'src/app/models/navigation.model';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationPanelComponent implements OnInit {

  @Input() workspaceName!: Workspace
  views: any[] = []
  workspace!: iWorkspace

  constructor (
    public navigation: NavigationService,
    public responsive: MxResponsive
  ) { }

  ngOnInit(): void {
    this.workspace = this.navigation.get(this.workspaceName)
  }

}
