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
const publicationsBasePath = environment.basePublicationApiUrl;

@Injectable({
  providedIn: 'root'
})
export class PublicationdataService {

  user: any = [];
  
  constructor(private httpClient : HttpClient) { }


    /**
     * Récupérer toutes les publications d'un utilisateur ==> Profil
     */
    public getPublicationsSpecificUser(user){
        return this.httpClient.get(publicationsBasePath + 'allPublications/' + user)
    }

    /**
     * Récupérer les infos d'une publication en particulier
     */
    public getOnePublicationInfo(uid): Observable<any>{
        return this.httpClient.get<any>(publicationsBasePath + '/publications/' + uid, httpOptions);
    }

    /**
     * Récuperer la timeline d'un utilisateur
     */
    public getTimelinePublications(username){
        return this.httpClient.get(publicationsBasePath + 'userTimeline/' + username);
    }


  /*

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

  getAllUsers(): Observable<any>{
    return this.httpClient
    .get<any>(usersBasePath , httpOptions);
  }

  public updateUserInfo(username, user): Observable<any>{
    return this.httpClient.put<any>(usersBasePath + username, user, httpOptions);
  }
}

*/

}
