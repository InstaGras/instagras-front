import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { PublicationdataService } from '../services/publicationdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentairedataService } from '../services/commentairesdata.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ContentdataService } from '../services/contentdata.service';

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
  public allCommentaires: Array<any>;

  publication = {
    user: {
      username: '',
      avatar: 'assets/profile-photo.jpg'
    },
    liked: true,
    likeCount: 3,
    content: '',
    description: 'oui'
   };

   public href: string = "";
   public publicationID: string;

   public idPublication;

   public comments;

  constructor(
    private keycloakService: KeycloakService,
    private commentairesdataService : CommentairedataService,
    private publicationdataService: PublicationdataService,
    private router: Router,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ContentDataService: ContentdataService,
    ) { }

  ngOnInit() {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    
    this.idPublication = (this.activatedRoute.snapshot.paramMap.get('publication'));
    this.getPostInfo(this.idPublication);

    this.getAllComments(this.idPublication);
  }

  getPostInfo(uidPost) {
    this.publicationdataService.getOnePublicationInfo(uidPost)
    .subscribe(success =>{
      this.publication.user.username = success.data.username;
      this.publication.description = success.data.description;
      let contentId=success.data.content_id;
      if(contentId==undefined ||contentId==""||contentId==null){
        contentId="5f5e6386-997b-4fdd-bb22-b57a5f7a755f";
      }
      this.ContentDataService.getContentById(contentId).subscribe(success => { 
          this.publication.content = this.convertToImage(success.data);
      },error => {
          console.log(error);
      }); 
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

    this.commentairesdataService.addComment(data)
    .subscribe(
      success => {
        this.getAllComments(this.idPublication);
      }
    );
  }

  async getAllComments(idPublication){
    this.commentairesdataService.getAllCommentairesPublication(idPublication)
    .subscribe(
      success => {
        this.comments = success.data;
        console.log(this.comments);
      },
      err => console.log(err)
    );
  }

  async deleteComment(idComment) {

    console.log(idComment);

    this.commentairesdataService.deleteComment(idComment)
    .subscribe(
      success => {
        console.log(success)
        this.getAllComments(this.idPublication);
      }
    );
  }
  
  convertToImage(buffer){
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }


}
