import { Component } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage  {

  constructor(private keycloakService: KeycloakService) {}

}
