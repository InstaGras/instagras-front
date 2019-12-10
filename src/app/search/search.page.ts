import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeycloakService } from '../auth/keycloak.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  userList : any[];
  keycloakUserProfile: any;
  url: string;

  constructor(
    private UserDataService: UserdataService,
    private router: Router,
    private keycloakService: KeycloakService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
    this.url = this.router.url;
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.initUserList();
  }

  initUserList() {
    this.userList=[];
    //init user list of search tab
    if(this.url.includes('search')){
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
    //init followers list of user
    }else if(this.url.includes('followers')){
      this.UserDataService.getFollowersByUsername(this.activatedRoute.snapshot.paramMap.get('username'))
      .subscribe(success => {
        console.log(success);
        success.data.followers.forEach(element => {
          const user = {
            username: element.follower_username
          }
          this.userList.push(user);
        });
        this.userList.sort((a, b) => a.username.localeCompare(b.username));
      },
      error => {
        console.log(error);
      });
    }
    //init followed list of user
    else if(this.url.includes('followed')){
    this.UserDataService.getFollowedByUsername(this.activatedRoute.snapshot.paramMap.get('username'))
    .subscribe(success => {
      console.log(success);
      success.data.followed.forEach(element => {
        console.log(element);
        const user = {
          username: element.followed_username
        }
        this.userList.push(user);
      });
      this.userList.sort((a, b) => a.username.localeCompare(b.username));
    },
    error => {
      console.log(error);
    });
  }
}

  openProfilePage(username: string){
    if(username != this.keycloakUserProfile.username){
      this.router.navigate(['users/'+username]);
    }
  }

}
