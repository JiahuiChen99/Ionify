import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';

import { SharingComponent } from '../../sharing/sharing.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
})
export class MusicDetailsPage implements OnInit {

  information: any;
  trackInfo: any;
  

  title: any;
  artist: any;
  image: string;
  filename: any;
  storageDirectory: any;
  curr_playing_file: MediaObject;
  play_The_track: string;
  duration: any = -1;
  position: any = 0;
  get_position_interval: any;
  is_playing = false;
  is_in_play = false;
  is_ready = false;
  get_duration_interval: any;
  display_position: any = '00:00';
  display_duration: any = '00:00';
  

  constructor(private activatedRoute: ActivatedRoute, private service: SallefyAPIService,
     private media: Media, private platform: Platform, private share: SharingComponent, private popoverController: PopoverController) { }

  ngOnInit() {
    let songName = this.activatedRoute.snapshot.paramMap.get('id');
 
    // Get the information from the API
    //.subscribe(result => ) means that the Observable is a success
    this.service.retrieveSpecificTrack(songName).subscribe(result => {
      this.information = result;
      
      this.trackInfo = this.information.tracks[0];
      console.log(this.trackInfo.url);
      this.play_The_track = this.information.tracks[0].url;
      this.image = this.trackInfo.thumbnail;
      this.prepareAudioFile();
      
    });


    

    
  }

  prepareAudioFile() {
    this.platform.ready().then((res) => {
      this.getDuration();
    });
  }

  getDuration() {
    this.curr_playing_file = this.media.create(this.play_The_track);
    // on occassions, the plugin only gives duration of the file if the file is played
    // at least once
    this.curr_playing_file.play();

    this.curr_playing_file.setVolume(0.0);  // you don't want users to notice that you are playing the file
    const self = this;
    // The plugin does not give the correct duration on playback start
    // Need to check for duration repeatedly
    let temp_duration = self.duration;
    this.get_duration_interval = setInterval(() => {
      if (self.duration === -1 || !self.duration) {
        self.duration = ~~(self.curr_playing_file.getDuration());  // make it an integer
      } else {
        if (self.duration !== temp_duration) {
          temp_duration = self.duration;
        }
        else {
          self.curr_playing_file.stop();
          self.curr_playing_file.release();

          clearInterval(self.get_duration_interval);
          this.display_duration = this.toHHMMSS(self.duration);
          self.setToPlayback();
        }
      }
    }, 100);
  }

  setToPlayback() {
    this.curr_playing_file = this.media.create(this.play_The_track);
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      switch (status) {
        case 1:
          break;
        case 2:   // 2: playing
          this.is_playing = true;
          break;
        case 3:   // 3: pause
          this.is_playing = false;
          break;
        case 4:   // 4: stop
        default:
          this.is_playing = false;
          break;
      }
    });
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
  }

  getAndSetCurrentAudioPosition() {
    const diff = 1;
    const self = this;
    this.get_position_interval = setInterval(() => {
      const last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then((position) => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);

          } else {
            // update position for display
            self.position = position;
            this.display_position = this.toHHMMSS(self.position);
          }
        } else if (position >= self.duration) {
          self.stop();
          self.setToPlayback();
        }
      });
    }, 100);
  }

  play() {
    this.curr_playing_file.play();
  }

  pause() {
    this.curr_playing_file.pause();
  }

  stop() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }

  controlSeconds(action) {
    const step = 5;
    const numberRange = this.position;
    switch (action) {
      case 'back':
        this.position = numberRange < step ? 0.001 : numberRange - step;
        break;
      case 'forward':
        this.position = numberRange + step < this.duration ? numberRange + step : this.duration;
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.stop();
  }

  toHHMMSS(secs) {
    var sec_num = parseInt(secs, 10)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v, i) => v !== "00" || i >= 0)
      .join(":")
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }


  async sharing(ev: any) {
    const popover = await this.popoverController.create({
        component: SharingComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
}

}
