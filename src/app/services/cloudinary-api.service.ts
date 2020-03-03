import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {

  url = 'https://api.cloudinary.com/v1_1/yumenokko/';
  resource_type = '';

  // Create the file uploader, wire it to upload to your account
  uploaderOptions: FileUploaderOptions = {
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

  constructor(private http: HttpClient, private hasBaseDropZoneOver: boolean = false,
              private uploader: FileUploader, private title: string) {
  }

  
  /*uploadProfileImage(image: string){

    this.resource_type = 'image';
    this.uploader = new FileUploader(this.uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary unsigned upload preset to the upload form
      //form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };


    //I give up on using Cloudinary SDK for Javascript
    //this.cloudinary.uploader.upload("my_image.jpg", function(error, result) {console.log('ME CAGO EN TO' + result, error)});
    //this.http.post(this.url + this.resource_type + '/upload', );
  }
  
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }*/
}
