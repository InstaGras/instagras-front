import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};
const contentBasePath = environment.baseContentApiUrl+'/contents';

@Injectable({
  providedIn: 'root'
})
export class ContentdataService {

  constructor(private httpClient : HttpClient) { }

  getContentById(id): Observable<any>{
    return this.httpClient
    .get<any>(contentBasePath+'/'+id , httpOptions);
  }
}
