import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'music-details/:id',
    loadChildren: () => import('./pages/music-details/music-details.module').then( m => m.MusicDetailsPageModule)
  },
  {
    path: 'likes',
    loadChildren: () => import('./pages/likes/likes.module').then( m => m.LikesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'playlists',
    loadChildren: () => import('./pages/playlists/playlists.module').then( m => m.PlaylistsPageModule)
  },
  {
    path: 'playlistview/:id',
    loadChildren: () => import('./pages/playlistview/playlistview.module').then( m => m.PlaylistviewPageModule)
  },  {
    path: 'upload-track',
    loadChildren: () => import('./pages/upload-track/upload-track.module').then( m => m.UploadTrackPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
