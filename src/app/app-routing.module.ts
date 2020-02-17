import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'music-list', pathMatch: 'full' },
  {
    path: 'music-list',
    loadChildren: () => import('./pages/music-list/music-list.module').then( m => m.MusicListPageModule)
  },
  {
    path: 'music-details/:id',
    loadChildren: () => import('./pages/music-details/music-details.module').then( m => m.MusicDetailsPageModule)
  },  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
