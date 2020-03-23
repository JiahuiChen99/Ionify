import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';

import { File } from '@ionic-native/File/ngx';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

export interface Gradient{
  name: string;
  colors: string[];
}

@Component({
  selector: 'app-upload-track',
  templateUrl: './upload-track.page.html',
  styleUrls: ['./upload-track.page.scss'],
})
export class UploadTrackPage implements OnInit {
  coverImage: string;
  songUrl: string;
  safeImg: any;
  photo: any;
  pathURL: any;
  imageUriPath: any;
  displayImage: any;

  gradients: Gradient[];

  loading: any;

  imagewithlabel: string;

  trackInformation = {
    name: '',
    color: '',
    duration: '',
    thumbnail: 'https://res.cloudinary.com/yumenokko/image/upload/v1584883942/songCover.jpg',
    url: ''
  };



  constructor(private service: SallefyAPIService, private camera: Camera, private file: File, private storage: Storage,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    public filepath: FilePath, private transfer: FileTransfer,
    public loadingController: LoadingController, private navCtrl:NavController, public http: HttpClient, public filechooser: FileChooser) { }

  ngOnInit() {
    this.coverImage = '../assets/img/songCover.jpg';

    this.http.get('../assets/gradients.json').subscribe(
      (data) => {
        this.gradients = Object.values(data);
        console.log(this.gradients);
      }
    );
    //this.gradients = JSON.parse(this.file.applicationDirectory + '../assets/gradients.json');
    //this.file.readAsText(this.file.applicationDirectory + 'www/assets', 'gradients.json');
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
      this.uploadImage();
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
       this.coverImage = JSON.parse(data.response).secure_url;

       this.trackInformation.thumbnail = this.coverImage;
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

  selectSong(){
    this.filechooser.open().then(uri => this.uploadSong(uri))
  }

  uploadSong(uri: string){ 

    this.presentLoading();
     //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    var serverurl = 'https://api.cloudinary.com/v1_1/yumenokko/video/upload';

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      params : {'upload_preset': 'preset'}
    }

    
    fileTransfer.upload(uri, serverurl, options).then((data) => {
       this.presentToast('Uploaded!');
       this.dismissLoading();
       this.songUrl = JSON.parse(data.response).secure_url;

       this.trackInformation.url = this.songUrl;
       console.log(JSON.parse(data.response).secure_url);
      }, (err)  => {
        this.presentToast('Song not uploaded');
      });
  }

  checkName(){
    return this.trackInformation.name != null;
  }

  uploadTrack(){
    this.service.uploadTrack(this.trackInformation).subscribe(
      () => {
        this.presentToast('Successfully uploaded!');
        this.navCtrl.pop();
      }, (err) => {
        this.presentToast('Error uploading song!');
      }
    );
  }
}
