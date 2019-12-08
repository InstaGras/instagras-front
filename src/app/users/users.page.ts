import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MoreComponent } from './more/more.component';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';

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
  followed=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public popoverController: PopoverController,
    private UserDataService: UserdataService,
  ) { }

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.initUser();
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
          this.followed = false;
        }
      }
    });

    return await popover.present();
}

  subscribe() {
    this.subscribeSpin = true;
    console.log('subscribe to ' + this.user.username);
    this.followed = true;
    this.subscribeSpin = false;
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
