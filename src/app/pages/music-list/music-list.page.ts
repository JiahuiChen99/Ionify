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

  constructor(private service: SallefyAPIService) { }

  ngOnInit() {
  }

  button(){
     this.trackList = this.service.retrieveTracks();
     
     this.trackList.subscribe();
  }

}
