import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform, ToastController } from '@ionic/angular';

import { SharingComponent } from '../../sharing/sharing.component';
import { PopoverController } from '@ionic/angular';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { MoreTrackComponent } from 'src/app/component/more-track/more-track.component';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

const step = 5;
declare var chrome;
var _session;
var _media = undefined;

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
})
export class MusicDetailsPage implements OnInit {

  information: any;
  trackInfo: any;
  trackLiked: boolean;
  songName: any;

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

  blur = false;
  

  constructor(private activatedRoute: ActivatedRoute, private service: SallefyAPIService,
     private media: Media, private platform: Platform, private share: SharingComponent, private popoverController: PopoverController,
     private downloader: Downloader, public toastController: ToastController, private musicControls: MusicControls,
     private backgroundMode: BackgroundMode) { }

  ngOnInit() {
    this.songName = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(_media);
    // Get the information from the API
    //.subscribe(result => ) means that the Observable is a success
    this.service.retrieveSpecificTrack(this.songName).subscribe(result => {
      this.information = result;

      this.trackInfo = this.information.tracks[0];
      this.service.isTrackLiked(this.trackInfo.id).subscribe(data => {
        this.trackLiked = data.liked;
      });
      this.play_The_track = this.information.tracks[0].url;
      this.image = this.trackInfo.thumbnail;
      this.artist = this.trackInfo.owner.login;
  
      this.prepareAudioFile();
      this.backgroundMode.enable();
      this.backgroundMode.on('activate').subscribe(() =>{
        this.backgroundMode.disableWebViewOptimizations(); 
      })
    });
  }

  setMediaControl(){
    this.musicControls.create({
      track       : this.songName,        // optional, default : ''
      artist      : this.artist,                       // optional, default : ''
      cover       : this.image,      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying   : true,                         // optional, default : true
      dismissable : false,                         // optional, default : false
    
      // hide previous/next/close buttons:
      hasPrev   : true,      // show previous button, optional, default: true
      hasNext   : true,      // show next button, optional, default: true
      hasClose  : false,       // show close button, optional, default: false

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker    : 'Now playing' + this.songName,
      // All icons default to their built-in android equivalents
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
     });

    this.musicControls.subscribe().subscribe((action) => {
      console.log('action', action);
          const message = JSON.parse(action).message;
          console.log('message', message);
          switch(message) {
            case 'music-controls-next':
               // Do something
                this.position = this.position + step < this.duration ? this.position + step : this.duration;
                if(_media != undefined){
                  this.seekMedia(this.position);
                }
               break;
            case 'music-controls-previous':
               // Do something
              this.position = this.position < step ? 0.001 : this.position - step;
              if(_media != undefined){
                this.seekMedia(this.position);
              }
              break;
            case 'music-controls-pause':
               // Do something
               this.pause();
               //this.curr_playing_file.pause();
               //this.musicControls.updateIsPlaying(false);
               break;
            case 'music-controls-play':
               // Do something
               console.log('music play');
               this.play();
               //this.curr_playing_file.play();
               //this.musicControls.updateIsPlaying(true);
               break;
            case 'music-controls-stop-listening':
                console.log('Destroyed in swith')
                this.musicControls.destroy();
              break;
            case 'music-controls-media-button-play':
              this.play(); 
              //this.curr_playing_file.play();
                //this.musicControls.updateIsPlaying(true);
              break;
            case 'music-controls-media-button-pause':
              this.pause();    
              /*this.curr_playing_file.pause();
                this.musicControls.updateIsPlaying(false);*/
              break;
            case 'music-controls-media-button-next':
              this.position = this.position + step < this.duration ? this.position + step : this.duration;
              if(_media != undefined){
                this.seekMedia(this.position);
              }
              break;
            case 'music-controls-media-button-previous':
              this.position = this.position < step ? 0.001 : this.position - step;
              if(_media != undefined){
                this.seekMedia(this.position);
              }
              break;
          }
    });
    this.musicControls.listen();  
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
    //this.setMediaControl();

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
          this.is_ready = true;
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
          this.musicControls.updateIsPlaying(true); // toggle the play/pause notification button
          break;
        case 3:   // 3: pause
          this.is_playing = false;
          this.musicControls.updateIsPlaying(false); // toggle the play/pause notification button
          break;
        case 4:   // 4: stop
        default:
          this.is_playing = false;
          this.musicControls.updateIsPlaying(false); // toggle the play/pause notification button
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
    this.setMediaControl();
    if(_media != undefined){
      console.log('Play Chromecast');
      this.musicControls.updateIsPlaying(true); // toggle the play/pause notification button)
      this.is_playing = true;
      this.playMedia();
    }else{
      console.log('Play Ionify')
      this.curr_playing_file.play();
    }
  }

  pause() {
    if(_media != undefined){
      console.log('Pause Chromecast');
      this.musicControls.updateIsPlaying(false); // toggle the play/pause notification button
      this.is_playing = false;
      this.pauseMedia();
    }else{
      console.log('Pause Ionify')
      this.curr_playing_file.pause();
      this.musicControls.updateIsPlaying(false);
    }
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
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    this.musicControls.destroy().then(onSuccess => (console.log('Destroyed correctly'), onError => (console.log('Error destroying'))));
    clearInterval(this.get_position_interval);
    this.position = 0;
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

  async sharing() {
    this.blur = true;
    const popover = await this.popoverController.create({
        component: SharingComponent,
        animated: true,
        showBackdrop: true,
    });


    popover.onWillDismiss().then(data => {
      this.blur = false;
    })

    return await popover.present();
  }

  like(){
    this.service.likeTrack(this.trackInfo.id).subscribe(data => {
      //this.trackLiked = (Object.values(data) == "true");
      this.trackLiked = data.liked;
      console.log( this.trackLiked);
    });
  }

  downloadTrack(){
    var request: DownloadRequest = {
      uri: this.play_The_track,
      title: this.trackInfo.name,
      description: '',
      mimeType: '',
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      visibleInDownloadsUi: true,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: this.trackInfo.name + '.mp3'
      }
    };

    this.downloader.download(request)
    .then((location: string) => this.presentToast('File downloaded at:'+location))
    .catch((error: any) => this.presentToast(JSON.stringify(error)));
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      mode: 'ios'
    });
    toast.present();
  }

  async presentPopover(ev: any) {
    //console.log(this.songName);
    const popover = await this.popoverController.create({
      component: MoreTrackComponent,
      componentProps: {songId: this.songName} ,
      event: ev,
      animated: true,
      translucent: true,
      mode: 'ios'
    });
    return await popover.present();
  }



  async chromecast(){
    var appId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
    var apiConfig = new chrome.cast.ApiConfig(new chrome.cast.SessionRequest(appId), function sessionListener (session) {
      // The session listener is only called under the following conditions:
      // * will be called shortly chrome.cast.initialize is run
      // * if the device is already connected to a cast session
      // Basically, this is what allows you to re-use the same cast session 
      // across different pages and after app restarts
    }, function receiverListener (receiverAvailable) {
      // receiverAvailable is a boolean.
      // True = at least one chromecast device is available
      // False = No chromecast devices available
      // You can use this to determine if you want to show your chromecast icon
    });
    

    // initialize chromecast, this must be done before using other chromecast features
    
    var mediaInfo = new chrome.cast.media.MediaInfo(this.play_The_track, 'audio/mpeg');
    mediaInfo.metadata = new chrome.cast.media.MusicTrackMediaMetadata();
    //mediaInfo.metadata.metadataType = ;
    //mediaInfo.contentType = 'audio/mpeg';
    mediaInfo.metadata.songName = 'Ionify';
    mediaInfo.metadata.title = this.trackInfo.name;
    mediaInfo.metadata.artist = this.trackInfo.owner.login;
    mediaInfo.metadata.releaseDate = '2014-02-10';
    mediaInfo.metadata.trackNumber = '1';
    mediaInfo.metadata.images = [{'url': this.trackInfo.thumbnail}]
    chrome.cast.initialize(apiConfig, function () {
        // Initialize complete
        // Let's start casting
        requestSession();
    }, function (err) {
        // Initialize failure
    });

        function requestSession () {
          // This will open a native dialog that will let 
          // the user choose a chromecast to connect to
          // (Or will let you disconnect if you are already connected)
      
          
          chrome.cast.requestSession(function (session) {
              // Got a session!
              _session = session;
      
              // Load a video            
              loadMedia();
          }, function (err) {
              // Failed, or if err is cancel, the dialog closed
          });
        }


        function loadMedia () {
          _session.loadMedia(new chrome.cast.media.LoadRequest(mediaInfo), function (media) {
              // You should see the video playing now!
              // Got media!
              _media = media;

          }, function (err) {
              // Failed (check that the video works in your browser)
          });
        }
  }

  
  pauseMedia () {
    _media.pause({}, function () {
        // Success
    }, function (err) {
        // Fail
    });          
  }

  playMedia () {
    _media.play({}, function () {
        // Success
    }, function (err) {
        // Fail
    });          
  }

  seekMedia (position: any) {
    _media.seek(new chrome.cast.media.SeekRequest(position), function () {
        // Success
    }, function (err) {
        // Fail
    });          
  }
}

