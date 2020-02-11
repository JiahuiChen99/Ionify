import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SallefyAPIService {

  url = 'http://sallefy.eu-west-3.elasticbeanstalk.com/api/tracks';
  // tslint:disable-next-line: max-line-length
  apiKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4MTQ5Nzc1MH0.84HZwmTHSalQSzigZbuDkdxOFlbxcEPg4sktMrMiR0wVsfuFOAQj9lF1cncX3UoyatCUjRm_Kxih-13FvRUDYg';
  
  

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.apiKey
    })
  };
  constructor(private http: HttpClient) { 

  
  }

  retrieveTracks(): Observable<any> {
    this.http.get(this.url, this.httpOptions).subscribe((data) => console.log(data));
    return this.http.get( this.url, this.httpOptions);
  }

}
