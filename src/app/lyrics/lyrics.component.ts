import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data-service.service';
import { NavigationInfoService } from '../services/navigation-info.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit {
// public songsList: any;
public currentSongId: string;
public result: Array<any> = [];
public currentLine: number;
marginForLyrics: number;
currentPlayListArray: Array<any>;
currentSong;
isPlaying:boolean;
  constructor(private data: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private getPlaylist: NavigationInfoService,
              private location: Location
              ) { }

  public ngOnInit(): void {
     console.log('bcnjhbz', window.history.length);
    this.currentPlayingSong();
       this.currentSongId = this.route.snapshot.params['url'];  
       this.route.parent.params.subscribe(params => {
             this.getMusic(params.playList);
        });
      this.data.getPlayerHeight().subscribe((response)=> {
        this.marginForLyrics = response;
        console.log('lyrics',response);
    }, error => {
        console.log('marginForContentViewError', error);
    });
  }

  public getMusic(playlist):void {
    this.getPlaylist.getMusic(playlist).subscribe(response => {
      this.currentPlayListArray = response.playlist.songs;
      this.getSongInfo(response.playlist.songs);
      console.log(response.playlist.songs);
    });
  };
   public getSongInfo(songsList):void {
     this.result = songsList.filter(songData => songData.url === this.currentSongId);
  }
   public getCurrentLineIndex(index):void {
    this.currentLine = index;
  }
   public playerStart(url):void {
      let index = this.currentPlayListArray.findIndex(currSongUrl => currSongUrl.url == url);
     this.data.currPlayList(this.currentPlayListArray, index);
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
 goBack() {

   this.location.back();
 }
}
