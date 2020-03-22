import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

@Component({
  selector: 'app-playlistview',
  templateUrl: './playlistview.page.html',
  styleUrls: ['./playlistview.page.scss'],
})
export class PlaylistviewPage implements OnInit {
  information: any;
  playlistName: string;
  playlistThumbnail: string;
  playlistTracks: any[];
  constructor(private activatedRoute: ActivatedRoute, private service: SallefyAPIService) { }

  ngOnInit() {
    let playlistName = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.retrieveSprecificPlaylist(playlistName).subscribe(
      result => {
        this.information = result;
        this.playlistName = result.name;
        this.playlistThumbnail = result.thumbnail;
        this.playlistTracks = result.tracks;
        console.log(this.information);
      }
    );
  }

}
