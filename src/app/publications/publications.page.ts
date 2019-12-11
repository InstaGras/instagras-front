import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { PublicationdataService } from '../services/publicationdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentairedataService } from '../services/commentairesdata.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ContentdataService } from '../services/contentdata.service';
import { LikeService } from '../services/like.service';

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
    liked: false,
    likeCount: 0,
    content: '',
    description: 'oui'
   };

   public href: string = "";
   public idPublication;
   public comments;
   likedPublication = true;

  constructor(
    private keycloakService: KeycloakService,
    private commentairesdataService : CommentairedataService,
    private publicationdataService: PublicationdataService,
    private router: Router,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ContentDataService: ContentdataService,
    private likeService: LikeService

    ) { }

  ngOnInit() {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    
    this.idPublication = (this.activatedRoute.snapshot.paramMap.get('publication'));
    this.getPostInfo(this.idPublication);
    this.getLikeCount(this.idPublication);
    this.getLikeByCurrentUser();
    
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

  async getLikeCount(idPublication) {
    this.likeService.countLikePublication(idPublication)
    .subscribe(
      success => 
      {
        this.publication.likeCount = success.data
      }
    );
  }

  async getLikeByCurrentUser(){
    const idPost = this.idPublication;

    const username = this.keycloakUserProfile.username;
    this.likeService.getLikeCurrentUser(idPost, username)
    .subscribe(
      success => {
        this.publication.liked = success.data,
        console.log(this.publication)
      }
      );
  }

  likePublication(value) {
    this.likedPublication = value;
    const username = this.keycloakUserProfile.username;
    const publication = this.idPublication;
    const data = { username, publication }
    this.publication.liked = value;

    this.likeService.addLikePublication(data);

    if (value) {
      this.publication.likeCount++;
    } else {
      this.publication.likeCount--;
    }
    /*
    if (value === true ) {
      this.LikeService.deleteLikePublication(data)
      .subscribe(
        success => console.log(success)
      );
    } else {
      this.LikeService.addLikePublication(data)
      .subscribe(
        success => console.log(success)
      );
    }
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
      },
      err => console.log(err)
    );
  }

  async deleteComment(idComment) {
    this.commentairesdataService.deleteComment(idComment)
    .subscribe(
      success => {
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
