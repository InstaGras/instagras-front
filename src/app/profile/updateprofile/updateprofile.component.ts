import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/auth/keycloak.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss'],
})
export class UpdateprofileComponent implements OnInit {

  userProfile: any;

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit() {
    this.userProfile = this.keycloakService.getUserProfile();
  }

}
