import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';

import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SallefyAPIService {

  url = 'http://sallefy-pre.eu-west-3.elasticbeanstalk.com/api/';
  // tslint:disable-next-line: max-line-length
  apiKey: any;
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

  constructor(private http: HttpClient, private nativehttp: HTTP, public toastController: ToastController) { 
  }



  login(body: any){

    console.log(body);
    this.http.post(this.url + 'authenticate', JSON.stringify(body), this.httpOptions2).subscribe(
      async data => {
        console.log(Object.values(data))
        this.apiKey = Object.values(data);
        console.log('API KEY: ' + this.apiKey)
        
        this.httpOptions.headers = new HttpHeaders({
          Authorization: 'Bearer ' + this.apiKey
        })
        
        console.log('HEADER: ' + this.httpOptions.headers)
        if(data){
          this.authenticationState.next(true);
        }
      }, error => {
        this.presentToast();
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login Failed - Your credentials are wrong',
      duration: 2000
    });
    toast.present();
  }

  logout(){
    this.apiKey = null;
    this.authenticationState.next(false);
  }

  register(){

  }

  isAuthenticated(){
    return this.authenticationState.value;
  }

  isTrackLiked(id: number): Observable<any>{
    return this.http.get( this.url + 'tracks/' + id + '/like', this.httpOptions);
  }

  likeTrack(id: number): Observable<any>{
    console.log(this.httpOptions);
    return this.http.put(this.url + 'tracks/' + id + '/like', null,this.httpOptions);
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
