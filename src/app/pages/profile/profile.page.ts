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

    playlists: Observable<any>;

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

    userInfo: any;
    profileImage: '';
    username: '';
    followers: number;
    following: number;
    likesArray: any[];
    likesNum: number;
    playlistsArray: any[];
    playlistsNum: number;
    constructor(public navCtrl: NavController, private service: SallefyAPIService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe();
    
    this.service.getUser().subscribe(
      (data) => {
        this.userInfo = data;
        this.username = this.userInfo.login;
        this.profileImage = this.userInfo.imageUrl;
        console.log(this.profileImage);
        this.followers = this.userInfo.followers;
        this.following = this.userInfo.following;
      });
    
    this.service.retrievePlaylists().subscribe(
      data => {
        this.playlists = data;
        this.playlistsArray = data as any[];
        this.playlistsNum = this.playlistsArray.length;
        console.log(this.playlists);
      }
    );

    this.service.retrieveLikedTracks().subscribe(
        data => {this.likes = data;
          this.likesArray = data as any[];
          this.likesNum = this.likesArray.length;
          console.log(this.likesNum)
        });
  }

  ionViewDidEnter(){
    this.service.retrieveLikedTracks().subscribe(
      data => {this.likes = data;
        this.likesArray = data as any[];
        this.likesNum = this.likesArray.length;
        console.log(this.likesNum)
      });
  }


  doRefresh(event) {
    
    this.service.retrieveLikedTracks().subscribe(
      data => {this.likes = data;
        this.likesArray = data as any[];
        this.likesNum = this.likesArray.length;
        console.log(this.likesNum)
      });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  logout(){
    this.service.logout();
  }
}
