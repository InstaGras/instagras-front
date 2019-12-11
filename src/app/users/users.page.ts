import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MoreComponent } from './more/more.component';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';
import { KeycloakService } from '../auth/keycloak.service';
import { PublicationdataService } from '../services/publicationdata.service';
import { ContentdataService } from '../services/contentdata.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  username: string = null;
  user: User;
  nbFollowers: string;
  nbFollowed: string;
  nbPublications: number;
  userIdentity: string;
  subscribeSpin: boolean;
  isFollowed: boolean;
  keycloakUserProfile: any;
  followersList: string[];
  publicationsList: any[];
  imagesList: any[];


  constructor(
    private keycloakService: KeycloakService,
    private activatedRoute: ActivatedRoute,
    public popoverController: PopoverController,
    private UserDataService: UserdataService,
    private PublicationDataService: PublicationdataService,
    private router: Router,
    private ContentDataService: ContentdataService,
  ) { }

  ngOnInit() {
    this.keycloakUserProfile = this.keycloakService.getUserProfile();
    
  }

  ionViewWillEnter(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.initUser();
    this.initIsFollowed();
    this.initPublications();
  }

  initUser() {
    this.UserDataService.getUserByUsername(this.username)
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

  initIsFollowed() {
    this.followersList=[];
    this.UserDataService.getFollowersByUsername(this.activatedRoute.snapshot.paramMap.get('username'))
    .subscribe(success => {
      console.log(success);
      success.data.followers.forEach(element => {
        const follower_username = element.follower_username;
        this.followersList.push(follower_username);
      })
      if(this.followersList.find(obj => obj === this.keycloakUserProfile.username )){
        this.isFollowed=true;
      }else{
        this.isFollowed=false;
      };
    },error => {
      console.log(error);
    });  
  }


  initPublications(){
    this.publicationsList=[];
    this.imagesList=[];
    this.PublicationDataService.getPublicationsByUsername(this.activatedRoute.snapshot.paramMap.get('username'))
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
            this.imagesList.push(this.convertToImage(success.data));
        },error => {
            console.log(error);
        }); 
      })
    this.nbPublications=this.publicationsList.length;
    console.log(this.imagesList);
    },error => {
      console.log(error);
    });  
  }

  async presentMorePopover(ev: any) {
    const popover = await this.popoverController.create({
        component: MoreComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });

    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned);
        if (dataReturned.data === 'unsubscribe') {
          this.unfollow();
        }
      }
    });

    return await popover.present();
  }

  subscribe() {
    this.subscribeSpin = true;
    this.UserDataService.createFollower(this.username,this.keycloakUserProfile.username)
    .subscribe(
      (response) => {
        console.log(response);
        this.initUser();
      },
      (error) => console.log(error)
    );
    this.isFollowed = true;
    this.subscribeSpin = false;
  }
  unfollow() {
    this.UserDataService.deleteFollower(this.username,this.keycloakUserProfile.username)
    .subscribe(
      (response) => {
        console.log(response);
        this.initUser();
      },
      (error) => console.log(error)
    );
    this.isFollowed = false;
    this.initUser();
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
