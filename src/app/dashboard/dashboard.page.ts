import {Component, OnInit, ViewChild} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { IonContent } from '@ionic/angular';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  keycloakUserProfile: any;

  likedPublication = true;

  constructor(
    private keycloakService: KeycloakService, 
    private UserdataService : UserdataService,
    private LikeService : LikeService) {}

  ngOnInit(): void {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.UserdataService.createUser(this.keycloakUserProfile.username);
  }

  scrollToTop() {
    this.ionContent.scrollToTop(300);
  }

  logout(): void {
    this.keycloakService.logout();
  }

  openProfile(uidUser: number) {
    console.log('try open the profile number ' + uidUser);
  }

  openPost(uidPost: number) {
    console.log('try open the post number ' + uidPost);
  }

  likePublication(value) {
    this.likedPublication = value;
    const user = this.keycloakUserProfile.username;
    const publication = 'publication id';
    
    const data = {user, publication}
    if (value === true ) {
      this.LikeService.deleteLikePublication(data);
    } else {
      this.LikeService.addLikePublication(data);
    }
  }

}
