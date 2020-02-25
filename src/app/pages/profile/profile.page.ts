import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    
    likes: Observable<any>;
    //@ViewChild('slide') slideWithNav: IonSlides;
    
    constructor(public navCtrl: NavController, private service: SallefyAPIService, private route: ActivatedRoute) { }
    
  ngOnInit() {
      this.route.params.subscribe();
    this.service.retrieveLikedTracks().subscribe(
        data => {this.likes = data;
            console.log(data);
        });
  }

  slideOpts = {
    slidesPerView: 1,
    freeMode: true,
    speed: 10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
goToLikesPage(item){
    console.log('CARD CLICKED');
}
    isEnd(){ 
    }

    print() {
        console.log("Hello");
    }
}
