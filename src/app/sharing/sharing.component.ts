import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


export class Song {
  id: number;
  name: string;
  url: string;
  thumbnail: string;
  released: any;
  duration: number;
  owner: {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    langKey: string;
  }
}

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss'],
})
export class SharingComponent implements OnInit {

  public songDetails : Song;

  create(arg0: { component: typeof SharingComponent; event: any; animated: boolean; showBackdrop: boolean; }) {
    throw new Error("Method not implemented.");
  }

  constructor(private share: SocialSharing) {
   }

  ngOnInit() {}

  twitterShare(message) {
    this.share.shareViaTwitter("Provando mi App", "/assets/icon/favicon.png" , "https://res.cloudinary.com/jcarri/video/upload/v1569164191/sallefy/songs/60-70-80-90/The_Cranberries_-_Dreams_qefdnq.mp3").then(
      ()=>{ console.log("shareViaWhatsApp: Success");
     }).catch(() => {
       console.error("shareViaWhatsApp: Failed")
     });
  }

  whatsappShare() {
    this.share.shareViaWhatsApp("Provando mi App", undefined , "https://res.cloudinary.com/jcarri/video/upload/v1569164191/sallefy/songs/60-70-80-90/The_Cranberries_-_Dreams_qefdnq.mp3").then(
     ()=>{ console.log("shareViaTwitter: Success");
    }).catch(() => {
      console.error("shareViaTwitter: Failed")
    });
  }

  instagramShare() {
    this.share.shareViaInstagram("Provando mi App", "/assets/icon/favicon.png").then(
      ()=>{ console.log("shareViaInstagram: Success");
     }).catch(() => {
       console.error("shareViaInstagram: Failed")
     });
  }
 
}
