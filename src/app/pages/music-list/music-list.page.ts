import { Component, OnInit } from '@angular/core';

import { SallefyAPIService } from 'src/app/services/sallefy-api.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ListOptionsComponent } from 'src/app/component/list-options/list-options.component';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.page.html',
  styleUrls: ['./music-list.page.scss'],
})
export class MusicListPage implements OnInit {

  trackList: Observable<any>;
  tracks: any;
  //The name of the track to be queried
  trackName: string = '';

  constructor(private service: SallefyAPIService, private modalCtrl: ModalController, private vibration: Vibration) { }

  ngOnInit() {
    this.trackList = this.service.retrieveTracks();
    this.trackList.subscribe(
      data => {this.tracks = data;
        //console.log(this.tracks);
    });
  }

  ionViewWillEnter(){
    this.trackList = this.service.retrieveTracks();
    this.trackList.subscribe(
      data => {this.tracks = data;
        //console.log(this.tracks);
    });
  }

  searchTrack(){
     this.trackList = this.service.retrieveSpecificTrack(this.trackName);
    
     this.trackList.subscribe(
        data =>{this.tracks = data.tracks;
        //console.log(this.tracks)
      })
  }

  async openModal(event: any, songName: string, slidingItem: any){
    if(event.detail.ratio == -1){
      this.vibration.vibrate(200);
      let modal = await this.modalCtrl.create({
        component: ListOptionsComponent,
        componentProps: {songId: songName},
        showBackdrop: true,
        cssClass: 'moreOptions-modal'
      })
      slidingItem.close();
      modal.present();
    }  
  }
}
