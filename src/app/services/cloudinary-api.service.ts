import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {

  url = 'https://api.cloudinary.com/v1_1/yumenokko/';
  resource_type = '';

  constructor(private http: HttpClient) { }

  uploadProfileImage(){
    this.resource_type = 'image';
    this.http.post(this.url + this.resource_type + '/upload', );
  }
}
