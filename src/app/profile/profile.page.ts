import {Component, OnInit} from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { Router } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';
import { NavController } from '@ionic/angular';
import { PublicationdataService } from '../services/publicationdata.service';
import { ContentdataService } from '../services/contentdata.service';



@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  keycloakUserProfile: any;
  user: User;
  userIdentity: string;
  nbFollowers: string;
  nbFollowed: string;
  nbPublications: number;
  publicationsList: any[];
  contentsList: any[];
  publicationImgList: any[];

  constructor
  (
    private keycloakService: KeycloakService,
    private router: Router,
    private UserDataService: UserdataService,
    public navCtrl: NavController,
    private PublicationDataService: PublicationdataService,
    private ContentDataService: ContentdataService,

  ) {}

  ngOnInit(): void {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();

  }
  ionViewWillEnter(): void {
    this.initUser();
    this.initPublications();
  }

  openAccountPage(): void {
    this.router.navigate(['account-options']);
  }

  openUpdateProfilePage(): void {
    this.router.navigate(['account-options/update-profile']);
  }

  initUser() {
    this.UserDataService.getUserByUsername(this.keycloakUserProfile.username)
    .subscribe(success => {
      this.user = success.data.users[0];
      this.initUserIdentity();
      this.nbFollowed=this.user.nbFollowed;
      this.nbFollowers=this.user.nbFollowers;
    },
    error => {
      console.log(error);
    });
  }

  initUserIdentity() {
    if (this.user) {
      const userIdentity = (
        ((this.user.firstname) ? this.user.firstname : '')
        + ' '
        + ((this.user.lastname) ? this.user.lastname : '')
      ).toLowerCase().trim();
      this.userIdentity = (userIdentity) ? userIdentity[0].toUpperCase() + userIdentity.slice(1) : 'Identité non saisie';
    }
  }

  logout(): void {
    this.keycloakService.logout();
  }

  openFollowersPage(username: string){
    if(this.nbFollowers!="0"){
      this.router.navigate(['followers/'+username]);
    }
  }
  openFollowedPage(username: string){
    if(this.nbFollowed!="0"){
      this.router.navigate(['followed/'+username]);
    }
  }

  initPublications(){
    this.publicationsList=[];
    this.contentsList=[];
    this.PublicationDataService.getPublicationsByUsername(this.keycloakUserProfile.username)
    .subscribe(success => {
      //initialisation of publications lists
      success.data.publications.forEach(element => {
        const publication = {
          id: element.id,
          username: element.username,
          description: element.description,
          creation_date: element.creation_date,
          content_id: element.content_id,
        };
        this.publicationsList.push(publication);
        //initialisation of content list
        if(publication.content_id==undefined ||publication.content_id==""||publication.content_id==null){
          publication.content_id="5f5e6386-997b-4fdd-bb22-b57a5f7a755f";
        }
        this.ContentDataService.getContentById(publication.content_id).subscribe(success => { 
            this.contentsList.push(success.data);
        },error => {
            console.log(error);
        }); 
      })
    this.nbPublications=this.publicationsList.length;
    console.log(this.contentsList);
    },error => {
      console.log(error);
    });  
  }

  transformBufferToBase64(bufferArray: any[]){
    let TYPED_ARRAY = new Uint8Array(bufferArray);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
      return data + String.fromCharCode(byte);
    }, ''); 
    let base64String = btoa(STRING_CHAR);
  }
}
