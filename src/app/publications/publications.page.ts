import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { PublicationdataService } from '../services/publicationdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss']
})
export class PublicationsPage implements OnInit {

  keycloakUserProfile: any;
  publicationInfos;

  publication = {
    user: {
      username: '',
      avatar: 'assets/profile-photo.jpg'
    },
    liked: true,
    likeCount: 3,
    content: ['/assets/profile-photo.jpg'],
    description: 'oui'
   };

   public href: string = "";
   public publicationID: string;

  constructor(
    private keycloakService: KeycloakService,
    private userdataService : UserdataService,
    private publicationdataService: PublicationdataService,
    private router: Router
    ) { }

  ngOnInit() {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    
    this.getPostInfo(this.router.url.slice(14));
  }

  getPostInfo(uidPost) {
    this.publicationInfos = this.publicationdataService.getOnePublicationInfo(uidPost)
    .subscribe(success =>{
      
      this.publication.user.username = success.data.username;
      this.publication.description = success.data.description;
    });

  }

  getLikeByCurrentUser(uidPost, username){
    /**
     * ajouter feature like
     */
    
  }

}
