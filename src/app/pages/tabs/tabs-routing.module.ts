import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
      path: 'music-list',
      loadChildren: () => import('../music-list/music-list.module').then( m => m.MusicListPageModule)
      },
      {
        path: 'music-details/:id',
        loadChildren: () => import('../music-details/music-details.module').then( m => m.MusicDetailsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {

        path:"",

        redirectTo:"music-list",

        pathMatch:"full"

       }
    ],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
