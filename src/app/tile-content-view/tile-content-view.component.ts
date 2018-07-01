import { Component, OnInit } from '@angular/core';
import { NavigationInfoService } from '../services/navigation-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tile-content-view',
  templateUrl: './tile-content-view.component.html',
  styleUrls: ['./tile-content-view.component.scss']
})
export class TileContentViewComponent implements OnInit {
public songsList: any[] = [];
public sortResult: any[] = [];
sub;
page;
sort;
  constructor(public getMusic: NavigationInfoService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadMusic();
        this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.page = params;
        console.log('cnhf', this.page.Вокал);
      });
  }
  public loadMusic():void {
    this.getMusic.getMusic().subscribe(response => {
      return this.songsList =  response.randomPlaylist.songs;
    });
  };

 public songSorting():void {
   this.sortResult = [];
   this.songsList.forEach((song) => {
   for (let i = 0; i < song.filters.length; i++) {  
     if (song.filters[i].name === 'Мужской') {
         this.sortResult.push(song);
         this.songsList = this.sortResult;
      } 
     }
   });
   console.log('результат сортировки',this.songsList);
  }
}


