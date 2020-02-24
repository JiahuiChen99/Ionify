import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

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

  constructor(private service: SallefyAPIService) { }

  ngOnInit() {
  }

  login(){
    this.body.username = this.username;
    this.body.password = this.password;
    this.service.login(this.body);
  }
}
