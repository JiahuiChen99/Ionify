import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';

import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';
import { error } from 'util';
import { CloudinaryApiService } from '../services/cloudinary-api.service';

@Injectable({
  providedIn: 'root',
})
export class SallefyAPIService {

  url = 'http://sallefy-pre.eu-west-3.elasticbeanstalk.com/api/';
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

  constructor(private http: HttpClient, private nativehttp: HTTP, public toastController: ToastController, private cloudinary: CloudinaryApiService) { 
  }



  login(body: any){

    //console.log(body);
    this.http.post(this.url + 'authenticate', JSON.stringify(body), this.httpOptions2).subscribe(
      async data => {
        //console.log(Object.values(data))
        this.apiKey = Object.values(data);
        //console.log('API KEY: ' + this.apiKey)
        
        this.httpOptions.headers = new HttpHeaders({
          Authorization: 'Bearer ' + this.apiKey
        })
        
        //console.log('HEADER: ' + this.httpOptions.headers)
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

  register(registerCredentials: any) : Observable<any>{
    return this.http.post(this.url + 'register', registerCredentials, this.httpOptions2);
  }

  uploadTrack(trackInformation: any): Observable<any>{
    return this.http.post(this.url + 'tracks', trackInformation, this.httpOptions);
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }

  isTrackLiked(id: number): Observable<any>{
    return this.http.get( this.url + 'tracks/' + id + '/like', this.httpOptions);
  }

  likeTrack(id: number): Observable<any>{
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

  retrievePlaylists(): Observable<any>{
    return this.http.get(this.url + 'me/playlists', this.httpOptions);
  }

  retrieveSprecificPlaylist(playlistId: string): Observable<any>{
    return this.http.get(this.url + 'playlists/' + playlistId, this.httpOptions);
  }
  
  getUser(){
    return this.http.get(this.url + 'account', this.httpOptions);
  }

}
