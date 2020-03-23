import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistviewPageRoutingModule } from './playlistview-routing.module';

import { PlaylistviewPage } from './playlistview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistviewPageRoutingModule
  ],
  declarations: [PlaylistviewPage]
})
export class PlaylistviewPageModule {}
