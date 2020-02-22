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
  apiKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4MjQ1MzQ4MH0.RGJ9OCS-BiTFIv0XrBVTdLKt53H7Trs9mYZA3deyca8sOmFDF_q3wwBYVwmx84iE-Szr6FJ-uQtRmo9n4oT4fQ';
  
  

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


  /*retrieveTracks(): Observable<any> {

    let call = this.nativehttp.get( this.url + 'tracks', {}, {Authorization: 'Bearer ' + this.apiKey});

    return from(call);
  }

  retrieveSpecificTrack(songName: String): Observable<any>{
    let call = this.nativehttp.get(this.url + 'search?keyword=' + songName, {}, {Authorization: 'Bearer ' + this.apiKey});
    
    return from(call);
  }*/
}
