import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

import { File } from '@ionic-native/File/ngx';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  base64Image: string;
  safeImg: any;
  photo: any;
  pathURL: any;
  imageUriPath: any;
  displayImage: any;

  loading: any;

  confirmPassword: '';

  registerCredentials = {
    login: '',
    firstName: '',
    lastName: '' ,
    email: '',
    password: '',
    imageUrl: 'https://res.cloudinary.com/yumenokko/image/upload/v1583577088/user_elytgp.jpg'
  };

  constructor(private service: SallefyAPIService, private camera: Camera, private file: File, private storage: Storage,
              private actionSheetController: ActionSheetController,
              private toastController: ToastController,
              public filepath: FilePath, private transfer: FileTransfer,
              public loadingController: LoadingController, private navCtrl:NavController) { }

  ngOnInit() {
   this.base64Image = '../assets/img/user.jpg';
  }

  register(){
    this.service.register(this.registerCredentials).subscribe(
      () => {
        this.presentToast('Succesfully registered!');
        this.navCtrl.pop();
    }, (err) => { 
      this.presentToast('Error creating user!')
    });
  }


  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: 'Select Image source',
        mode: 'ios',
        animated: true,
        translucent: true,
        cssClass: 'example',
        buttons: [{
                text: 'Load from Library',
                icon: 'images',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                icon: 'aperture',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'myActionSheetBtnStyle'
            }
        ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    let options: CameraOptions = {
        quality: 100,
        allowEdit: true,
        sourceType: sourceType,
        saveToPhotoAlbum: true,
        correctOrientation: true,
        encodingType: this.camera.EncodingType.JPEG,
        destinationType: this.camera.DestinationType.FILE_URI
    };

    this.camera.getPicture(options).then((imageData) => {

      if( sourceType == this.camera.PictureSourceType.PHOTOLIBRARY){
        
        this.pathURL = imageData;
        //const tempFilename = imageData.substr(imageData.lastIndexOf('/') + 1);


        }else{
          // Extract just the filename. Result example: cdv_photo_003.jpg
        const tempFilename = imageData.substr(imageData.lastIndexOf('/') + 1);

        // Now, the opposite. Extract the full path, minus filename. 
        // Result example: file:///var/mobile/Containers/Data/Application
        // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/tmp/
        const tempBaseFilesystemPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);

        // Get the Data directory on the device. 
        // Result example: file:///var/mobile/Containers/Data/Application
        // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/Library/NoCloud/
        const newBaseFilesystemPath = this.file.dataDirectory;

        this.file.copyFile(tempBaseFilesystemPath, tempFilename, 
          newBaseFilesystemPath, tempFilename);

        // Result example: file:///var/mobile/Containers/Data/Application
        // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/Library/NoCloud/cdv_photo_003.jpg
        this.pathURL = newBaseFilesystemPath + tempFilename;
      }
    } , (error) => {
        this.presentToast('No files were selected');
    }
    );
  }

  uploadImage(){ 

    this.presentLoading();
     //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    var serverurl = 'https://api.cloudinary.com/v1_1/yumenokko/image/upload';

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      params : {'upload_preset': 'preset'}
    }

    
    fileTransfer.upload(this.pathURL, serverurl, options).then((data) => {
       this.presentToast('Uploaded!');
       this.dismissLoading();
       this.base64Image = JSON.parse(data.response).secure_url;

       this.registerCredentials.imageUrl = this.base64Image;
       console.log(JSON.parse(data.response).secure_url);
      }, (err)  => {
        this.presentToast('Image not uploaded');
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Uploading...',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

  checkIsEnabled() {
    return this.confirmPassword === this.registerCredentials.password;
}
}
