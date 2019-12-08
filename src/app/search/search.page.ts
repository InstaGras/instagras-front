import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Router } from '@angular/router';
import { KeycloakService } from '../auth/keycloak.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  userList : any[];
  keycloakUserProfile: any;

  constructor(
    private UserDataService: UserdataService,
    private router: Router,
    private keycloakService: KeycloakService,
  ){}

  ngOnInit() {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.initUserList();
  }

  initUserList() {
    this.userList=[];
    this.UserDataService.getAllUsers()
    .subscribe(success => {
      success.data.users.forEach(element => {
        const user = {
          username: element.username
        }
        if(user.username!=this.keycloakUserProfile.username ){
          this.userList.push(user);
        }
      });
      this.userList.sort((a, b) => a.username.localeCompare(b.username));
    },
    error => {
      console.log(error);
    });
  }

  openProfilePage(username: string){
    console.log("Ouverture de la page de profile de "+username);
    this.router.navigate(['users/'+username]);
  }

}
