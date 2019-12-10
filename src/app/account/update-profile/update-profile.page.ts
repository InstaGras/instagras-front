import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/auth/keycloak.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  updateProfileForm: FormGroup;

  updateProfileFormValidationMessages = {
    firstname: [
      { type: 'required', message: 'Veuillez saisir votre nom.' },
      { type: 'minlength', message: 'Votre nom doit faire au moins 2 lettres de long.' },
      { type: 'maxlength', message: 'Votre nom ne doit pas dépasser les 60 lettres de long.' },
      { type: 'pattern', message: 'Veuillez saisir votre nom avec lettres et tirets uniquement.' },
      { type: 'validUsername', message: 'Nom valide.' }
    ],
    lastname: [
      { type: 'required', message: 'Veuillez saisir votre prénom.' },
      { type: 'minlength', message: 'Votre prénom doit faire au moins 2 lettres de long.' },
      { type: 'maxlength', message: 'Votre prénom ne doit pas dépasser les 60 lettres de long.' },
      { type: 'pattern', message: 'Veuillez saisir votre prénom avec lettres et tirets uniquement.' },
      { type: 'validUsername', message: 'Prénom valide.' }
    ],
  };
  userProfile: any;

  update = {};

  constructor(
    private keycloakService: KeycloakService,
    private userdataService: UserdataService,
    public formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    public loadingController: LoadingController
    ) { }


  ngOnInit() {
    this.userProfile = this.keycloakService.getUserProfile();
    this.updateProfileForm = this.formBuilder.group({
      firstname: new FormControl(((this.userProfile.firstname) ? this.userProfile.firstname : ''), Validators.compose([
        Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ- ]*[A-Za-zÀ-ÖØ-öø-ÿ]$/),
        Validators.minLength(2),
        Validators.maxLength(60)
      ])),
      lastname: new FormControl(((this.userProfile.name) ? this.userProfile.name : ''), Validators.compose([
        Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ- ]*[A-Za-zÀ-ÖØ-öø-ÿ]$/),
        Validators.minLength(2),
        Validators.maxLength(60)
      ]))
    });
  }

  async updateProfile(formObj: FormGroup) {
    formObj.setValue({
      firstname: formObj.value.firstname.trim(),
      lastname: formObj.value.lastname.trim()
    });
    console.log(formObj.valid);
    if (formObj.valid) {
      const loading = await this.presentLoading();
      await loading.present();
      this.userdataService.updateUserInfo(this.userProfile.username, formObj.value)
      .subscribe(arg => {
        console.log(arg);
        loading.dismiss();
        this.presentSuccesToast();
        
      }, err => {
        console.log(err);
        loading.dismiss();
        this.presentErrorToast();
      });
    }
  }
  submitMyProfile() {
    console.log(this.update);
    this.userdataService.updateUserInfo(this.userProfile.username ,this.update)
   // this.userdataService.updateUserInfo('user', 'oui');
  }

  openProfile() {
    this.router.navigate(['tabs/profile']);
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Une erreur est survenue lors de la mise à jour de votre profile.',
      duration: 5000,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ],
      color: "danger"
    });
    toast.present();
  }

  async presentSuccesToast() {
    const toast = await this.toastController.create({
      message: 'Vos données ont été mises à jour avec succès.',
      duration: 5000,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ],
      color: "success"
    });
    toast.present();
  }

  async presentLoading() {
    return await this.loadingController.create({
      message: 'Mise à jour de vos données ...'
    });
  }

}
