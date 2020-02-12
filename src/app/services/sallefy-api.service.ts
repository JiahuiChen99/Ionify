import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SallefyAPIService {

  url = 'http://sallefy.eu-west-3.elasticbeanstalk.com/api/';
  // tslint:disable-next-line: max-line-length
  apiKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTU4MTU4NzEwMH0.J-tSMLfeBgmtmJu7TFxJNK1O0uzMDqfoHuDdHhP0DndA10Z9nGbDcT1IyWlgLb5lTgaj-YmHe8veOrWGCuDm-Q';
  
  

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.apiKey
    })
  };
  constructor(private http: HttpClient) { 
  }

  retrieveTracks(): Observable<any> {
    return this.http.get( this.url + 'tracks', this.httpOptions);
  }

  retrieveSpecificTrack(songName: String): Observable<any>{
    //this.http.get(this.url + 'search?keyword=' + songName, this.httpOptions).subscribe((data) => console.log(data));
    return this.http.get(this.url + 'search?keyword=' + songName, this.httpOptions);
  }
}
