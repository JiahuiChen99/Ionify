import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'music-list', pathMatch: 'full' },
  {
    path: 'music-list',
    loadChildren: () => import('./pages/music-list/music-list.module').then( m => m.MusicListPageModule)
  },
  {
    path: 'music-details',
    loadChildren: () => import('./pages/music-details/music-details.module').then( m => m.MusicDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
