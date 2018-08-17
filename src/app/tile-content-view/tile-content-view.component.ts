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
pagesArray: Array<number> = [];
itemsOnPage: number = 18;
currentPage: number = null;
itemsOnPageArray: Array<any> = [];
//placeholderUlbumCover:string = './assets/images/placeholder_for_album_cover.png'

  constructor(public getMusic: NavigationInfoService,
              public route: ActivatedRoute,
              private router: Router,
              private data: DataService
              ) { }

  public ngOnInit():void {
   this.loadMusic();
   this.currentPlayingSong();
    this.data.getPlayerHeight().subscribe((response)=> {
        this.marginForContentView = response;
    }, error => {
        console.log('marginForContentViewError', error);
    })
    this.route.queryParams.subscribe(params => { 
        this.currentPage = params.page;

    console.log(params);
      const filterParamsArray = Object.keys(params).reduce((object, key) => {
       if (key !== 'page') {
          object[key] = params[key]
         }
    return object
    }, {});
          this.queryParamsArray = Object.keys(filterParamsArray).map(val => filterParamsArray[val]); 
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
        this.itemsOnPageArray = this.sortResult;  
      }
       this.loaded = true;
    });
   this.getPageQuantity();
   this.pageContentGenaretor()
  }
 public playerStart(url):void {
     let index = this.sortResult.findIndex(currSongUrl => currSongUrl.url== url);
     this.data.currPlayList(this.sortResult, index);
     console.log('tile player start', this.sortResult);
     this.currentPlayingSong();
 }
  getPageQuantity() {
      this.pagesArray = [];
      const pageQuantity = Math.ceil(this.sortResult.length / this.itemsOnPage);
     for (let i = 0; i < pageQuantity; i++) {
        this.pagesArray.push(i);
     }
 }
  currentPlayingSong() {
    this.data.nowPlaying.subscribe((url:any) => {     
      this.currentSong = url;
      });
    this.data.isPlaying.subscribe((play:any) => {  
          this.isPlaying = play;
      }); 
 }
   pageContentGenaretor() {
       this.itemsOnPageArray = [];
       let totalLeftItemsArray = [];
       for(let i = this.itemsOnPage*(this.currentPage - 1); i < this.sortResult.length; i++) {
            totalLeftItemsArray.push(this.sortResult[i]);
       }
       for (let k = 0; k < this.itemsOnPage && k < totalLeftItemsArray.length; k++) {
           this.itemsOnPageArray.push(totalLeftItemsArray[k]);
       }
 }
}
