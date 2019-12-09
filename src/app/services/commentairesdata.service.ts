import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};
const commentairesBasePath = environment.baseCommentairesApiUrl;

@Injectable({
  providedIn: 'root'
})
export class CommentairedataService {

  user: any = [];
  
  constructor(private httpClient : HttpClient) { }

    /**
     * Récupérer toutes les publications d'un utilisateur ==> Profil
     */
    public getAllCommentairesPublication(idPublication){
        return this.httpClient.get(commentairesBasePath + 'getAllCommentairesPublication/' + idPublication, httpOptions)
    }
}
