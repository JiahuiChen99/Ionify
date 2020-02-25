import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';

import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class SallefyAPIService {

  url = 'http://sallefy-pre.eu-west-3.elasticbeanstalk.com/api/';
  //http://sallefy-pre.eu-west-3.elasticbeanstalk.com/api/
  // tslint:disable-next-line: max-line-length
  apiKey: string;
  authenticationState = new BehaviorSubject(false);
  

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.apiKey
    })
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient, private nativehttp: HTTP) { 
  }



  login(body: any){

    console.log(body);
    this.http.post(this.url + 'authenticate', JSON.stringify(body), this.httpOptions2).subscribe(
      data => {console.log(data);
        this.apiKey = data.toString();
        if(data){
          this.authenticationState.next(true);
        }
      }
    );
  }

  logout(){
    this.apiKey = null;
    this.authenticationState.next(false);
  }

  isAuthenticated(){
    return this.authenticationState.value;
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
