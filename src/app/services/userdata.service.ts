import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  
  constructor(private httpClient : HttpClient) { }

  public createUser(username: string){
    const user = {
      username: username
    };
    this.httpClient.post(environment.baseUserApiUrl+'users/', user, httpOptions).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
 }
}