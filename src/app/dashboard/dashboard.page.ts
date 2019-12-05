import {Component, OnInit, ViewChild} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { IonContent } from '@ionic/angular';



@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  keycloakUserProfile: any;
  constructor(private keycloakService: KeycloakService, private UserdataService : UserdataService) {}

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

}
