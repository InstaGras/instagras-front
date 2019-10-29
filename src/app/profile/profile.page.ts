import {Component, OnInit} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';



@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

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
