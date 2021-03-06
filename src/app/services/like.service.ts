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
const likeBasePath = environment.baseLikeApiUrl + '/likes/';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  user: any = [];
  
  constructor(private httpClient : HttpClient) { }

  public addLikePublication(data): Observable<any> {
      console.log(data);
      console.log('add like');
      return this.httpClient.post<any>(likeBasePath, data, httpOptions);
  }

  /*
  public deleteLikePublication(data) : Observable<any>{
    console.log(data);
      return this.httpClient.delete<any>(likeBasePath, data);
  }
*/

  public countLikePublication(data): Observable<any>{
    return this.httpClient.get<any>(likeBasePath + data, httpOptions);
  }

  public getLikeCurrentUser(idPost, username): Observable<any>{
    return this.httpClient.get<any>(likeBasePath + 'getLikeUser/'+ idPost +'/' + username, httpOptions);
  }
}
