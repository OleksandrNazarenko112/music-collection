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
arr;

  constructor(public getMusic: NavigationInfoService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadMusic();
        this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.page = params;
       
       this.page = Object.keys(this.page).map(val => this.page[val]);
       
     this.songSorting();
this.arr = this.page.length;
      console.log('this.page', this.page.length);

      });
  }
  public loadMusic() {
    this.getMusic.getMusic().subscribe(response => {
      this.songsList =  response.randomPlaylist.songs;
      this.songSorting();
      console.log(this.songsList)
    });
  };

 public songSorting() {
   this.sortResult = [];
    console.log('this.page', this.page.lenght);
   console.log('список песен',this.songsList)
   this.songsList.forEach((song) => {
   for (let i = 0; i < song.filters.length; i++) {  
     for(let k = 0; k < this.arr; k++) {
     if (song.filters[i].name == this.page[k]) {
       
         this.sortResult.push(song);
       
         console.log('song result', this.sortResult);
      } 

    }
     }
  });
}
}
