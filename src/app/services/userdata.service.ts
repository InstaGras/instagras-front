import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { UserInterface } from '../interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};
const usersBasePath = environment.baseUserApiUrl+'/users/';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  user: any = [];
  
  constructor(private httpClient : HttpClient) { }

  public createUser(username: string){
    const user:User  = new User(username,'','');
    this.httpClient.post(usersBasePath,  JSON.stringify(user), httpOptions).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
 }
  getUserByUsername(username): Observable<any>{
    return this.httpClient
    .get<any>(usersBasePath + username, httpOptions);
  }
}