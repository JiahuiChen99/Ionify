import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadTrackPage } from './upload-track.page';

const routes: Routes = [
  {
    path: '',
    component: UploadTrackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadTrackPageRoutingModule {}
