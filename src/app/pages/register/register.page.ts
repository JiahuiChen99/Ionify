import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

import { File } from '@ionic-native/File/ngx';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx'
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64/ngx';

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

  registerCredentials = {
    login: '',
    username: '',
    lastName: '' ,
    email: '',
    password: '',
    confirmPassword: '',
    
  };

  base64: Base64;

  constructor(private service: SallefyAPIService, private camera: Camera, private file: File, private storage: Storage,
              private actionSheetController: ActionSheetController, private toastController: ToastController, public filepath: FilePath, private transfer: FileTransfer,
              private webview: WebView, public sanitizer: DomSanitizer) { }

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
        
        this.base64.encodeFile(this.pathURL).then((base64File: string) => {
          this.base64Image = base64File});

        console.log('URL: ' + this.base64Image);

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
        
        this.base64.encodeFile(this.pathURL).then((base64File: string) => {
          this.base64Image = base64File});

        console.log('URL: ' + this.base64Image);
      }
        
        
    } , (error) => {
        this.presentToast('Error selecting the image: ' + JSON.parse(error));
    }
    );
  }

  uploadImage(){ 
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
       this.presentToast('Uploaded!')
       this.base64Image = JSON.parse(data.response).secure_url;
       console.log(JSON.parse(data.response).secure_url);
      }, (err)  =>
      console.log('HELLO::' + JSON.stringify(err)
      ));
  
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
