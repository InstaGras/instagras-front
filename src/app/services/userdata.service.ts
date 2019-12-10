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
const followersBasePath = environment.baseUserApiUrl+'/followers/';
const followedBasePath = environment.baseUserApiUrl+'/followed/';



@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  user: any = [];
  
  constructor(private httpClient : HttpClient) { }

  public createUser(username: string){
    const user:User  = new User(username,'','');
    this.httpClient.post(usersBasePath, JSON.stringify(user), httpOptions).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
 }
 public createFollower(followedUsername: string,followerUsername: string): Observable<any>{
  const follower = {
    'follower_username':followerUsername,
    'followed_username':followedUsername
  }
  return this.httpClient.post<any>(followersBasePath, follower, httpOptions);
 }
  
public deleteFollower(followedUsername: string,followerUsername: string): Observable<any>{
  const follower = {
    'follower_username':followerUsername,
    'followed_username':followedUsername
  }
  return this.httpClient.request('delete', followersBasePath, { body: follower });
}
  getUserByUsername(username): Observable<any>{
    return this.httpClient
    .get<any>(usersBasePath + username, httpOptions);
  }

  getFollowersByUsername(username): Observable<any>{
    return this.httpClient
    .get<any>(followersBasePath + username, httpOptions);
  }

  getFollowedByUsername(username): Observable<any>{
    return this.httpClient
    .get<any>(followedBasePath + username, httpOptions);
  }

  getAllUsers(): Observable<any>{
    return this.httpClient
    .get<any>(usersBasePath , httpOptions);
  }

  public updateUserInfo(username, user): Observable<any>{
    return this.httpClient.put<any>(usersBasePath + username, user, httpOptions);
  }
}
