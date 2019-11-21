import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/auth/keycloak.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss'],
})
export class UpdateprofileComponent implements OnInit {

  userProfile: any;
  modifyMyProfile: FormGroup;

  constructor(
    private keycloakService: KeycloakService, 
    private userdataService: UserdataService,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.userProfile = this.keycloakService.getUserProfile();
  }


  submitMyProfile() {
    console.log(this.userProfile.username);
   // this.userdataService.updateUserInfo('user', 'oui');
  }

}
