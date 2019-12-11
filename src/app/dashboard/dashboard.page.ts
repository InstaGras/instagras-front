import {Component, OnInit, ViewChild} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { UserdataService } from '../services/userdata.service';
import { IonContent } from '@ionic/angular';
import { LikeService } from '../services/like.service';
import { Router } from '@angular/router';
import { PublicationsPage } from '../publications/publications.page';
import { PublicationdataService } from '../services/publicationdata.service';
import { ContentdataService } from '../services/contentdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  providers: [PublicationsPage]
})
export class DashboardPage implements OnInit {
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  keycloakUserProfile: any;

  publicationsList: any[];
  followedUserList: string[];
  nbPublications: number;
  likedPublication = true;

  constructor(
    private keycloakService: KeycloakService,
    private UserdataService : UserdataService,
    private publicationPage: PublicationsPage,
    private PublicationDataService: PublicationdataService,

    private likeService : LikeService,
    private router: Router,
    private ContentDataService: ContentdataService
    ) {}


  ngOnInit(): void {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    this.UserdataService.createUser(this.keycloakUserProfile.username);
  }
  ionViewWillEnter(): void {
    this.initPublications();
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


  openCreatePublication() {
    this.router.navigate(['publications/publish']);
  }

  openPost(uidPost: number) {
    console.log('try open the post number ' + uidPost);
    this.router.navigate(['publications/' + uidPost]);
  }

  likePublication(value) {
    this.likedPublication = value;
    const username = this.keycloakUserProfile.username;
    const publication = 'RqimiUwNuT7gJNDATGWvXZ';
    
    const data = { username, publication }

    this.likeService.addLikePublication(data)
    .subscribe(
      success => console.log(success)
    )
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
  initPublications(){
    this.publicationsList=[];
    //get all users followed by our user
    this.UserdataService.getFollowedByUsername(this.keycloakUserProfile.username)
    .subscribe(success => {
      //for each user get all publications
      console.log("Users suivis : "+success.data.followed);
      success.data.followed.forEach(element => {
        this.PublicationDataService.getPublicationsByUsername(element.followed_username)
        .subscribe(success => {
          success.data.publications.forEach(element => {

            var id= element.id;
            var username= element.username;
            var description= element.description;
            var creation_date= element.creation_date;
            var content_id= element.content_id;
            //initialisation of content list
          if(content_id==undefined ||content_id==""||content_id==null){
            content_id="5f5e6386-997b-4fdd-bb22-b57a5f7a755f";
          }
          this.ContentDataService.getContentById(content_id).subscribe(success => { 
            const publication = {
              id: id,
              username: username,
              description: description,
              creation_date: creation_date,
              content_id: content_id,
              img: this.convertToImage(success.data)
            };
            this.publicationsList.push(publication);
          },error => {
            console.log(error);
          }); 
        })
      },error=>{
        console.log(error);
      })
    })
    this.nbPublications=this.publicationsList.length;  
  },error=>{
    console.log(error);
  })
}
doRefresh(event) {
  setTimeout(() => {
    this.initPublications();
    event.target.complete();
  }, 2000);
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
