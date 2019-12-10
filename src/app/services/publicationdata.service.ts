import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};
const publicationsBasePath = environment.basePublicationApiUrl+'/publications';

@Injectable({
  providedIn: 'root'
})
export class PublicationdataService {

  constructor(private httpClient : HttpClient) { }

  getPublicationsByUsername(username): Observable<any>{
    return this.httpClient
    .get<any>(publicationsBasePath + '?username='+username, httpOptions);
  }
}
