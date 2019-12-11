import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};
const publicationsBasePath = environment.basePublicationApiUrl  ;

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
        return this.httpClient.get(publicationsBasePath + '/allPublications/' + user)
    }

    /**
     * Récupérer les infos d'une publication en particulier
     */
    public getOnePublicationInfo(uid): Observable<any>{
        return this.httpClient.get<any>(publicationsBasePath + 'publications/' + uid, httpOptions);
    }

    /**
     * Récuperer la timeline d'un utilisateur
     */
    public getTimelinePublications(username){
        return this.httpClient.get(publicationsBasePath + 'publications/userTimeline/' + username);
    }

  getPublicationsByUsername(username): Observable<any>{
    return this.httpClient
    .get<any>(publicationsBasePath+ 'publications' + '?username='+username, httpOptions);
  }
}
