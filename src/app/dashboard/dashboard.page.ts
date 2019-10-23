import {Component, OnInit} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  userProfile: any;
  constructor(private keycloakService: KeycloakService) {}

  logout(): void {
    this.keycloakService.logout();
  }

  ngOnInit(): void {
    this.userProfile = this.keycloakService.getUserProfile();
    console.log(this.userProfile);
  }

}
