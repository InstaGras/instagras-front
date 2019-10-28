import {Component, OnInit} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';



@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  userProfile: any;
  public images = [
    {
      id: 1,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120'
    },
    {
      id: 2,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120'
    },
    {
      id: 3,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120'
    },
    {
      id: 4,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120'
    },
    {
      id: 5,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120'
    },
    {
      id: 6,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120'
    }
  ];

  constructor(private keycloakService: KeycloakService) {}

  logout(): void {
    this.keycloakService.logout();
  }

  ngOnInit(): void {
    this.userProfile = this.keycloakService.getUserProfile();
    console.log(this.userProfile);
  }


}
