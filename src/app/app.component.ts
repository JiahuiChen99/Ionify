import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SallefyAPIService } from './services/sallefy-api.service';
import { Router } from '@angular/router';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: SallefyAPIService,
    private router: Router,
    private lottieSplashScreen: LottieSplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.lottieSplashScreen.hide()
      });
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleBlackTranslucent();

      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state =>{
        if(state){
          this.router.navigate(['tabs']);
        }else{
          this.router.navigate(['login']);
        }
      })
    });
  }
}
