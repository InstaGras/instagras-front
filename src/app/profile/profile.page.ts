import {Component, OnInit} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { Router } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user';
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
  galleryType = 'regular';

  constructor(private keycloakService: KeycloakService, private router: Router, private UserDataService: UserdataService, public navCtrl: NavController) {}

  ngOnInit(): void {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.initUser();
  }

  openUpdateProfilePage(): void {
    this.router.navigate(['tabs/profile/updateprofile']);
  }

  titleCaseWord(word: string): string {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  initUser() {
    this.UserDataService.getUserByUsername(this.keycloakUserProfile.username)
    .subscribe(user => {
      this.user=user;
      console.log(user);
    },
    error=>{
      console.log(error);
    });
  }

  initUserIdentity() {
    if (this.user != undefined){
      let userIdentity = 'User identity unknown';
      if(this.user.lastname != null && this.user.firstname != null){
        userIdentity = this.titleCaseWord(this.user.firstname) + ' ' + this.user.lastname.toLowerCase;
      }
      else if(this.user.lastname == null && this.user.firstname != null){
        userIdentity = this.titleCaseWord(this.user.firstname) ;
      }
      else if(this.user.lastname != null && this.user.firstname == null){
        userIdentity = this.titleCaseWord(this.user.lastname);
      }
      this.userIdentity=userIdentity;
    }
  }
  logout(): void {
    this.keycloakService.logout();
  }
}
