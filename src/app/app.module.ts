import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common//http';
import { Media } from '@ionic-native/media/ngx';

import { SharingComponent } from '../app/sharing/sharing.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Downloader, DownloadRequest } from '@ionic-native/downloader/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { FileUploadModule } from "ng2-file-upload";

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx'

@NgModule({
  declarations: [AppComponent, SharingComponent],
  entryComponents: [SharingComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({_forceStatusbarPadding: true}),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FileUploadModule,
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'yumenokko',
                                             api_key: '197131348377583',
                                             api_secret: 'iFfogcymcyWxAK5KNeYQ9ups2PY' } as CloudinaryConfiguration)],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    SharingComponent,
    SocialSharing,
    HTTP,
    Downloader,
    Camera,
    File,
    WebView,
    FilePath,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
