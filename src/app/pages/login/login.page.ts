import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  body = {
    "password": this.password,
    "rememberMe": true,
    "username": this.username
  };
  
  subscribe: any;
  constructor(private service: SallefyAPIService, public platform: Platform) { 
    this.subscribe = this.platform.backButton.subscribe(() => navigator["app"].exitApp());
  }

  ngOnInit() {
  }

  login(){
    this.body.username = this.username;
    this.body.password = this.password;
    this.service.login(this.body);
  }
}
