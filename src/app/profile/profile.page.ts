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
    .subscribe(success => {
      this.user = success.data.users[0];
      this.initUserIdentity();
      console.log(this.user);
    },
    error=>{
      console.log(error);
    });
  }

  initUserIdentity() {
    console.log("test1")
    console.log(this.user)
    if (this.user != undefined){
      console.log("test2")
      let userIdentity = 'Identité non saisie';
      if (this.user.lastname != "" && this.user.firstname != ""){
        userIdentity = this.titleCaseWord(this.user.firstname) + ' ' + this.user.lastname.toLowerCase;
      }
      else if (this.user.lastname == "" && this.user.firstname != ""){
        userIdentity = this.titleCaseWord(this.user.firstname) ;
      }
      else if (this.user.lastname != "" && this.user.firstname == ""){
        userIdentity = this.titleCaseWord(this.user.lastname);
      }
      this.userIdentity=userIdentity;
    }
    console.log("user identity: "+this.userIdentity);
  }
  logout(): void {
    this.keycloakService.logout();
  }
}
