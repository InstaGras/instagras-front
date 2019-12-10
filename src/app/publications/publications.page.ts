import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { PublicationdataService } from '../services/publicationdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentairedataService } from '../services/commentairesdata.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss']
})
export class PublicationsPage implements OnInit {

  addComment: FormGroup;

  keycloakUserProfile: any;
  publicationInfos;
  public commentaires: string = '';

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

   public idPublication;

  constructor(
    private keycloakService: KeycloakService,
    private commentairesdataService : CommentairedataService,
    private publicationdataService: PublicationdataService,
    private router: Router,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    
    this.idPublication = (this.activatedRoute.snapshot.paramMap.get('publication'));
    this.getPostInfo(this.idPublication);
  }

  getPostInfo(uidPost) {
    this.publicationdataService.getOnePublicationInfo(uidPost)
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

  async addCommentaire(contenuCommentaire) {
    
    const data = { 
      contenu: contenuCommentaire,
      username: this.keycloakUserProfile.username,
      publication: this.idPublication
     }

    this.commentairesdataService.addComment(data);
    console.log(contenuCommentaire);
  }

  
}
