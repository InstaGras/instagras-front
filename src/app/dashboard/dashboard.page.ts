import {Component, OnInit, ViewChild} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  keycloakUserProfile: any;
  publicationList: string[];
  constructor(
    private keycloakService: KeycloakService,
    private UserdataService : UserdataService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.UserdataService.createUser(this.keycloakUserProfile.username);
    this.publicationList=[];
  }

  scrollToTop() {
    this.ionContent.scrollToTop(300);
  }

  logout(): void {
    this.keycloakService.logout();
  }

  openProfile(uidUser: number) {
    console.log('try open the profile number ' + uidUser);
    this.router.navigate(['users/' + uidUser]);
  }

  openPost(uidPost: number) {
    console.log('try open the post number ' + uidPost);
  }

}
