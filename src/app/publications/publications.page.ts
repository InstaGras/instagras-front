import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { PublicationdataService } from '../services/publicationdata.service';
import { Router } from '@angular/router';
import { CommentairedataService } from '../services/commentairesdata.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss']
})
export class PublicationsPage implements OnInit {

  keycloakUserProfile: any;
  publicationInfos;
  commentaires;

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
    private commentairesdataService : CommentairedataService,
    private publicationdataService: PublicationdataService,
    private router: Router
    ) { }

  ngOnInit() {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    
    const idPublication = (this.router.url.slice(14));

    this.getPostInfo(idPublication);
    this.getCommentairesPublications(idPublication);
  }

  getPostInfo(uidPost) {
    this.publicationdataService.getOnePublicationInfo(uidPost)
    .subscribe(success =>{
      this.publication.user.username = success.data.username;
      this.publication.description = success.data.description;
    });

  }

  getCommentairesPublications(id) {
    this.commentaires = this.commentairesdataService.getAllCommentairesPublication(id);
  }

  getLikeByCurrentUser(uidPost, username){
    /**
     * ajouter feature like
     */
    
  }

}
