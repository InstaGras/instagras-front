import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MoreComponent } from './more/more.component';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';
import { KeycloakService } from '../auth/keycloak.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  username: string = null;
  user: User;
  nbFollowers: string;
  nbFollowed: string;
  userIdentity: string;
  subscribeSpin = false;
  isFollowed=false;
  keycloakUserProfile: any;


  constructor(
    private keycloakService: KeycloakService,
    private activatedRoute: ActivatedRoute,
    public popoverController: PopoverController,
    private UserDataService: UserdataService,
  ) { }

  ngOnInit() {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.initUser();
    this.initIsFollowed();
  }

  initUser() {
    this.UserDataService.getUserByUsername(this.username)
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

  initIsFollowed() {
    this.UserDataService.isFollowed(this.username,this.keycloakUserProfile.username)
    .subscribe(success => {
      if(success.success=true){
        this.isFollowed=true;
        console.log(success.message);
        console.log('this.username: '+this.username+',this.keycloakUserProfile.username: '+this.keycloakUserProfile.username);
      }else{
        this.isFollowed=false;
        console.log(success.message);
      }
    },
    error => {
      console.log(error);
    });
  }

  async presentMorePopover(ev: any) {
    const popover = await this.popoverController.create({
        component: MoreComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });

    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned);
        if (dataReturned.data === 'unsubscribe') {
          this.unfollow();
        }
      }
    });

    return await popover.present();
}

  subscribe() {
    this.UserDataService.createFollower(this.username,this.keycloakUserProfile.username);
    this.isFollowed = true;
    this.subscribeSpin = false;
    this.initUser();
  }
  unfollow() {
    this.UserDataService.deleteFollower(this.username,this.keycloakUserProfile.username);
    this.isFollowed = false;
    this.initUser();
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
}
