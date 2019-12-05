import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { KeycloakService } from 'src/app/auth/keycloak.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

 

@Component({
  selector: 'app-publication',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
})
export class PublicationPage implements OnInit {

  public form: FormGroup;

  userProfile: any;
  description = '';
  body: Array<any>;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.userProfile = this.keycloakService.getUserProfile();
  }

  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {

    console.log(this.userProfile);

    const file = new FormData();
    file.append('image', this.selectedFile, this.selectedFile.name);

    /**
     * route post du document
     */
    this.http.post('oui', file, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe( event => { 
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%')
      } else if (event.type === HttpEventType.Response) {
        console.log(event)
      }
    });

    /**
     * route post de la publication
     */

     this.form = this.formBuilder.group({
       user: [this.userProfile.username],
       date: [new Date()],
       
     }); 
     
  }

}