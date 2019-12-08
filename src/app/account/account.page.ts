import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../auth/keycloak.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
  }

  updateProfile() {
    this.router.navigate(['account-options/update-profile']);
  }
  logout(){
    this.keycloakService.logout();
  }
}
