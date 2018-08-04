import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TileContentViewComponent } from './tile-content-view/tile-content-view.component';
import { LyricsComponent } from './lyrics/lyrics.component';
const appRoutes: Routes = [
    { path: 'songs-tile/:playList', component: TileContentViewComponent, children: [
    { path: 'lyrics/:song', component: LyricsComponent }
  ] } 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }