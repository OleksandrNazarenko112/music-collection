import { Component, OnInit} from '@angular/core';
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
public queryParamsArray: Array<any>;
currentSong:any;
isPlaying:boolean;
loaded: boolean;
marginForContentView: any = null;


  constructor(public getMusic: NavigationInfoService,
              public route: ActivatedRoute,
              private router: Router,
              private data: DataService
              ) { }

  public ngOnInit():void {
   this.loadMusic();
    this.data.getPlayerHeight().subscribe((response)=> {
        this.marginForContentView = response;
    }, error => {
        console.log('marginForContentViewError', error);
    })
       this.route.queryParams.subscribe(params => {   
          this.queryParamsArray = Object.keys(params).map(val => params[val]); 
          this.songSorting();
     });
     this.route.params.subscribe(params => {
         this.data.passCurrentNestedRoute(params);
    });

  }  
  public loadMusic():void {
     this.data.getPlayList().subscribe((response) => {
      this.songsList = response.playlist.songs;
      console.log(response);
      this.songSorting();
     })
   }
 public songSorting():void {
   this.sortResult = [];
     this.songsList.forEach((song) => {
        let success = this.queryParamsArray.every((val) => {
          return song.filters.indexOf(val) != -1;
      });
     if(success) {
        this.sortResult.push(song);
      }
      this.loaded = true;
    });
  }
 public playerStart(index):void {
     this.data.currPlayList(this.sortResult, index);
     this.currentPlayingSong();
 }
 currentPlayingSong() {
    this.data.nowPlaying.subscribe((url:any) => {     
      this.currentSong = url;
      });
    this.data.isPlaying.subscribe((play:any) => {  
          this.isPlaying = play;
      }); 
 }
}
