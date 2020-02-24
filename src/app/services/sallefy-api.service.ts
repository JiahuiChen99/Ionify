import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class SallefyAPIService {

  url = 'http://sallefy-pre.eu-west-3.elasticbeanstalk.com/api/';
  //http://sallefy-pre.eu-west-3.elasticbeanstalk.com/api/
  // tslint:disable-next-line: max-line-length
  apiKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4MjYxNzEyMH0.5aRaYnJQVzbCVB0Zlz2kj7SlOitbgeo4VFMszb2HLEi5lh980THjQ8ctq2vMvHfn3WAtMTFx3PlULQ1OF0tSLw';
  
  

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.apiKey
    })
  };
  constructor(private http: HttpClient, private nativehttp: HTTP) { 
  }

  retrieveTracks(): Observable<any> {
    return this.http.get( this.url + 'tracks', this.httpOptions);
  }

  retrieveSpecificTrack(songName: String): Observable<any>{
    //this.http.get(this.url + 'search?keyword=' + songName, this.httpOptions).subscribe((data) => console.log(data));
    return this.http.get(this.url + 'search?keyword=' + songName, this.httpOptions);
  }

  retrieveLikedTracks(): Observable<any>{
    return this.http.get(this.url + 'me/tracks/liked', this.httpOptions);
  }
}
