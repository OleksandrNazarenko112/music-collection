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
public queryParams: any;

  constructor(public getMusic: NavigationInfoService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadMusic();
        this.sub = this.route.queryParams.subscribe(params => {   
          this.queryParams = Object.keys(params).map(val => params[val]); 
          this.songSorting();
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
     this.songsList.forEach((song) => {
        let success = this.queryParams.every((val) => {
          return song.filters.indexOf(val) != -1;
      });
     if(success) {
      this.sortResult.push(song);
      }
    });
  }
}
