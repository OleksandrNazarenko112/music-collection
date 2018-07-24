import { Component, OnInit } from '@angular/core';
import { NavigationInfoService } from '../services/navigation-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-tile-content-view',
  templateUrl: './tile-content-view.component.html',
  styleUrls: ['./tile-content-view.component.scss']
})
export class TileContentViewComponent implements OnInit {
public songsList: any[] = [];
public sortResult: Array<any>;
public queryParams: any;
currentSong:any;
isPlaying:boolean;

  constructor(public getMusic: NavigationInfoService,
              private route: ActivatedRoute,
              private router: Router,
              private data: DataService
              ) { }

  public ngOnInit():void {
    this.loadMusic();
       this.route.queryParams.subscribe(params => {   
          this.queryParams = Object.keys(params).map(val => params[val]); 
          this.songSorting();
     });
     this.route.params.subscribe(params => {
         this.data.passCurrentNestedRoute(params);
    });

  }
  
  public loadMusic():void {
    this.getMusic.getMusic().subscribe(response => {
      this.songsList =  response.randomPlaylist.songs;
      this.songSorting();
    });
  };

 public songSorting():void {
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

 public playerStart(index):void {
     this.data.currPlayList(this.sortResult, index);
     this.currentPlayingSong(index);
 }
 currentPlayingSong(index) {
       console.log('index', index);
    this.data.nowPlaying.subscribe((url:any) => {     
      this.currentSong = this.sortResult[index].url === url;
      });
    this.data.isPlaying.subscribe((play:any) => {  
          this.isPlaying = play;
      }); 
    if(this.currentSong && this.isPlaying) {
       return this.currentSong;
    } else {
      return false;
    }
 }
}
