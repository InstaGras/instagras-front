import {Component, OnInit} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  keycloakUserProfile: any;
  constructor(private keycloakService: KeycloakService, private UserdataService : UserdataService) {}

  ngOnInit(): void {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.UserdataService.createUser(this.keycloakUserProfile.username);
  }

  logout(): void {
    this.keycloakService.logout();
  }

}
