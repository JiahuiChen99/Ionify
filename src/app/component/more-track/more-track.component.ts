import { Component, OnInit, Input } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';
import { DownloadRequest, Downloader, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { ToastController, PopoverController } from '@ionic/angular';
import { SharingComponent } from 'src/app/sharing/sharing.component';

declare var chrome;
var _session;
var _media;
@Component({
  selector: 'app-more-track',
  templateUrl: './more-track.component.html',
  styleUrls: ['./more-track.component.scss'],
})
export class MoreTrackComponent implements OnInit {
  trackInfo: any;
  information: any;
  trackLiked: boolean;
  trackURL: string;


  @Input("songId") songId;
  constructor(private service: SallefyAPIService, private downloader: Downloader,  public toastController: ToastController,
              private popoverController: PopoverController) { }

  ngOnInit() {
    console.log(this.songId);

    this.service.retrieveSpecificTrack(this.songId).subscribe(result => {
      this.information = result;

      this.trackInfo = this.information.tracks[0];
      console.log(this.trackInfo);
      this.trackURL = this.information.tracks[0].url;
      this.service.isTrackLiked(this.trackInfo.id).subscribe(data => {
        console.log(Object.values(data));
        this.trackLiked = data.liked;
      });

    });
  }

  like(){
    this.service.likeTrack(this.trackInfo.id).subscribe(data => {
      //this.trackLiked = (Object.values(data) == "true");
      this.trackLiked = data.liked;
      console.log( this.trackLiked);
    });
  }

  /*delete(){
    this.service.delete();
  }*/

  async share(){
    const popover = await this.popoverController.create({
      component: SharingComponent,
      animated: true,
      showBackdrop: true,
    });
    popover.present();
  }

  download(){
    var request: DownloadRequest = {
      uri: this.trackInfo.url,
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

  async chromecast(track : string){
    console.log(track[0]);
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
    console.log('2' + this.trackURL);
    var mediaInfo = new chrome.cast.media.MediaInfo(this.trackURL, 'audio/mpeg');
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
}
