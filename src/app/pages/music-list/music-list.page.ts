import { Component, OnInit } from '@angular/core';

import { SallefyAPIService } from 'src/app/services/sallefy-api.service';
import { Observable } from 'rxjs';

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

  constructor(private service: SallefyAPIService) { }

  ngOnInit() {
    this.trackList = this.service.retrieveTracks();
    this.trackList.subscribe(
      data => {this.tracks = data;
        console.log(this.tracks);
    });
  }

  searchTrack(){
     this.trackList = this.service.retrieveSpecificTrack(this.trackName);
    
     this.trackList.subscribe(
       data =>{this.tracks = data.tracks;
              console.log(this.tracks)})
  }

}
