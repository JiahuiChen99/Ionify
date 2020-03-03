import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

import { File } from '@ionic-native/File/ngx';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  base64Image: string;

  registerCredentials = {
    login: '',
    username: '',
    lastName: '' ,
    email: '',
    password: '',
    confirmPassword: '',
    
  };

  constructor(private service: SallefyAPIService, private camera: Camera, private file: File, private storage: Storage,
              private actionSheetController: ActionSheetController, private toastController: ToastController) { }

  ngOnInit() {
   this.base64Image = '../assets/img/user.jpg';
  }

  register(){
    this.service.register(this.base64Image);
  }


  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: 'Select Image source',
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    let options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
    this.camera.getPicture(options).then((ImageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + ImageData;
    }, (error) => {
        this.presentToast('Error selecting the image: ' + JSON.parse(error));
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }
}
