import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TileContentViewComponent } from './tile-content-view/tile-content-view.component';
import { LyricsComponent } from './lyrics/lyrics.component';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'songs-tile/:playList', component: TileContentViewComponent, 
      children: [
    { path: 'lyrics/:url', component: LyricsComponent }
  ] },
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: 'not-found'} 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }