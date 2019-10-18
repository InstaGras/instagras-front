import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  register(value: any) {
    return new Observable();
  }

  login(value: any) {
    return new Observable();
  }
}
