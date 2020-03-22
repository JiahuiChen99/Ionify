import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadTrackPageRoutingModule } from './upload-track-routing.module';

import { UploadTrackPage } from './upload-track.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadTrackPageRoutingModule
  ],
  declarations: [UploadTrackPage]
})
export class UploadTrackPageModule {}
