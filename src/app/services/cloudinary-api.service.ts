import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {

  responses: Array<any>;

  url = 'https://api.cloudinary.com/v1_1/yumenokko/';
  resource_type = '';

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;

  constructor(private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient, private toastController: ToastController) {
    this.responses = [];
    this.title = '';
  }

  
  uploadProfileImage(image: string){
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    const upsertResponse = fileItem => {
      // Check if HTTP request was successful
      if (fileItem.status !== 200) {
        console.log('Upload to cloudinary Failed');
        this.presentToast('Upload to cloudinary Failed');
        console.log(fileItem);
        return false;
      }
      console.log(fileItem);
      console.log(fileItem.data.url);
    }

    this.uploader = new FileUploader(uploaderOptions);
    

    this.uploader.onBuildItemForm = (image: any, form: FormData): any => {
      // Add Cloudinary unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add file to upload
      form.append('file', image);

      this.presentToast('UPLOADING');
      // Use default "withCredentials" value for CORS requests
      image.withCredentials = false;
      return { image, form };
    };

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // Actualizar el modelo al finalizar la carga de un archivo
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file, status,
          data: JSON.parse(response),
        }
      );
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
