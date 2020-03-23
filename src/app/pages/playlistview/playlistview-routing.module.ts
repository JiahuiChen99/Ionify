import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistviewPage } from './playlistview.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistviewPageRoutingModule {}
