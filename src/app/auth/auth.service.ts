import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  isAuth = false;

  register(value: any) {
    return new Observable();
  }

  login(user: any) {
    return new Promise(
        (resolve, reject) => {
          setTimeout(
              () => {
                if(user.email === 'admin@gmail.com' && user.password === 'admin') {
                  this.isAuth = true;
                } else{
                  this.isAuth = false;
                }
                resolve(true);
              }, 2000
          );
        }
    );
  }
}
