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
    //console.log(this.songId);

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
}
