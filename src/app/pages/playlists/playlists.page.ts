import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
})
export class PlaylistsPage implements OnInit {

  playlists: any;
  trackNum: number;
  constructor(private service: SallefyAPIService) { }

  ngOnInit() {
    this.service.retrievePlaylists().subscribe(
      result => {
        this.playlists = result;
      }
    );
  }

}
