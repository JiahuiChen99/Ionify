import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerCredentials = { username:'', lastName:'' ,email:'',password:'', confirmPassword:'',  };

  constructor(private service: SallefyAPIService) { }

  ngOnInit() {
  }


  register(){
    this.service.register();
  }
}
