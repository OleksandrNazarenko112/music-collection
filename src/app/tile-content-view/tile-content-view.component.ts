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
public sortResult: Array<any>;
sub;
page;
sort;
test;
  constructor(public getMusic: NavigationInfoService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadMusic();
        this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.page = params;
       this.songSorting();
       console.log('cnhf', this.page.filter);
      });

  }
  public loadMusic() {
    this.getMusic.getMusic().subscribe(response => {
      this.songsList =  response.randomPlaylist.songs;
        this.songSorting();
    });
  };
 public songSorting() {
   this.sortResult = [];
   console.log('список песен',this.songsList)
   this.songsList.forEach((song) => {
   for (let i = 0; i < song.filters.length; i++) {  
     if (song.filters[i].name == this.page.filter) {
         this.sortResult.push(song);
         console.log('enter');
         console.log('song list', this.songsList);
      } 
     }
   });
  }
}
