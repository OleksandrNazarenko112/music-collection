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
public queryParams: any;
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
          this.queryParams = Object.keys(params).map(val => params[val]); 
          console.log(this.queryParams);
          this.songSorting();
     });
     this.route.params.subscribe(params => {
         this.data.passCurrentNestedRoute(params);
    });

  }  
  public loadMusic():void {
     this.data.getPlayList().subscribe((response) => {
      this.songsList = response.playlist.songs;
      this.songSorting();
      this.loaded = true;
     })
   }
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
