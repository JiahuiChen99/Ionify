import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SallefyAPIService {

  url = 'http://sallefy.eu-west-3.elasticbeanstalk.com/api/';
  // tslint:disable-next-line: max-line-length
  apiKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4MTY4MTkwNn0.DWjBHNcHKwP5OzH0-qRfxu7f2j3pFA3UK5LDqN_BodyVJwKBWHTn1yjTBd9LHT2FSh-TEoDb82o8vF6cML49SQ';
  
  

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
