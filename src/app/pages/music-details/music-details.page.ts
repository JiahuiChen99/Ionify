import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
})
export class MusicDetailsPage implements OnInit {

  information: any;

  trackInfo: any;

  constructor(private activatedRoute: ActivatedRoute, private service: SallefyAPIService) { }

  ngOnInit() {
    let songName = this.activatedRoute.snapshot.paramMap.get('id');
 
    // Get the information from the API
    this.service.retrieveSpecificTrack(songName).subscribe(result => {
      this.information = result;
      
    
      this.trackInfo = this.information.tracks;
      console.log(this.trackInfo)
      
    });

    
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }
}
