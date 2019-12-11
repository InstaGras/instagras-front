import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

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
    public getAllCommentairesPublication(idPublication) : any{
        return this.httpClient.get(commentairesBasePath + '/commentaires/' + idPublication, httpOptions);
    }

    public addComment(data){
      return this.httpClient.post(commentairesBasePath + '/create/', data, httpOptions);
    }

    public deleteComment(idComment: number) : Observable<any>{

      console.log('ça marche ça ?')

      const test = {
        'idComment': idComment
      }

      return this.httpClient.request('delete', commentairesBasePath + '/commentaires/', { body: test});
    }
/*
    public deleteFollower(followedUsername: string,followerUsername: string): Observable<any>{
      const follower = {
        'follower_username':followerUsername,
        'followed_username':followedUsername
      }
      return this.httpClient.request('delete', followersBasePath, { body: follower });
    }
  */  
}
