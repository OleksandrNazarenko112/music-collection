import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TileContentViewComponent } from './tile-content-view/tile-content-view.component';

const appRoutes: Routes = [
    { path: 'songs-tile', component: TileContentViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }