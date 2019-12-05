import {Component, OnInit} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { Router } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  keycloakUserProfile: any;
  user: User;
  userIdentity: string;
  nbFollowers: string;
  nbFollowed: string;

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private UserDataService: UserdataService,
    public navCtrl: NavController,
  ) {}

  ngOnInit(): void {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.initUser();
  }

  openAccountPage(): void {
    this.router.navigate(['account-options']);
  }

  openUpdateProfilePage(): void {
    this.router.navigate(['account-options/update-profile']);
  }

  initUser() {
    this.UserDataService.getUserByUsername(this.keycloakUserProfile.username)
    .subscribe(success => {
      this.user = success.data.users[0];
      this.initUserIdentity();
      this.nbFollowed=this.user.nbFollowed;
      this.nbFollowers=this.user.nbFollowers;
      console.log(this.user);
    },
    error => {
      console.log(error);
    });
  }

  initUserIdentity() {
    if (this.user) {
      const userIdentity = (
        ((this.user.firstname) ? this.user.firstname : '')
        + ' '
        + ((this.user.lastname) ? this.user.lastname : '')
      ).toLowerCase().trim();
      this.userIdentity = (userIdentity) ? userIdentity[0].toUpperCase() + userIdentity.slice(1) : 'Identité non saisie';
    }
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
