import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {error} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginErrorMessage: string;

  constructor(private  authService: AuthService, private  router: Router) {
  }

  ngOnInit() {
  }

  login(form) {
    const user = {
      email: form.value.email,
      password: form.value.password
    }
    console.log(user);
    this.authService.login(user).then(
        () => {
          if (this.authService.isAuth) {
            console.log("CONNECTION OK");
            this.loginErrorMessage = '';
            this.router.navigate(['tabs/dashboard']);
          } else {
            console.log("CONNECTION KO");
            this.loginErrorMessage = 'Connection failed';
          }
        }
    );
  }
}
