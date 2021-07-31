import { Injectable } from '@angular/core';
import { iWorkspace, Workspace } from '../models/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  userInteraction: boolean = false;
  backIcon: boolean = false;
  constructor () { }

  get(name: Workspace) {
    return this.workspaces.find(d => d.name == name) as iWorkspace;
  }

  workspaces: iWorkspace[] = [
    { name: 'admin', views: [
      {
        route: 'dashboard',
        icon: 'fa-tachometer-alt',
        display: 'Panel',
      },
      {
        route: 'propiedades',
        icon: 'fa-home',
        display: 'Propiedades',
      },
      {
        route: 'manage-admins',
        icon: 'fa-users',
        display: 'Personal',
      },
      {
        route: 'manage-database',
        icon: 'fa-server',
        display: 'Base de datos',
      },
    ] },
    { name: 'talent', views: [
      {
        route: 'home',
        icon: 'fa-edit',
        display: 'Home',
        // alike: 'paquete?state=collected'
      },
      {
        route: 'contratos',
        icon: 'fa-file-contract',
        display: 'Contratos',
      },
      {
        route: 'perfil',
        icon: 'fa-play',
        display: 'Perfil',
        // alike: 'paquete'
      },
    ] },
    { name: 'client', views: [
      {
        route: 'home',
        icon: 'fa-home',
        display: 'Home',
        // alike: 'paquete'
      },
      {
        route: 'contratos',
        icon: 'fa-file-contract',
        display: 'Contratos',
      },
      {
        route: 'express',
        icon: 'fa-play',
        display: 'Express',
      },

    ] },
  ]
}
