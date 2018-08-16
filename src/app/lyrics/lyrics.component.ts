import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data-service.service';
import { NavigationInfoService } from '../services/navigation-info.service';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit {
// public songsList: any;
public currentSongUrl: string;
public result: Array<any> = [];
public currentLine: number;
marginForLyrics: number;
  constructor(private data: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private getPlaylist: NavigationInfoService
              ) { }

  public ngOnInit(): void {
       this.currentSongUrl = this.route.snapshot.params['url'];  
       this.route.parent.params.subscribe(params => {
             this.getMusic(params.playList);
        });
    //   this.data.getPlayerHeight().subscribe((response)=> {
    //     this.marginForLyrics = response;
    //     console.log('lyrics',response);
    // }, error => {
    //     console.log('marginForContentViewError', error);
    // });
  }
  // public getPlaylist() {
  //    this.data.getPlayList().subscribe((response) => {
  //     this.songsList =  response.playlist.songs;
  //     console.log('child', this.songsList)
  //     this.getSongInfo();
  //    }, error => {
  //      console.log(error);
  //    })
  //  }

  public getMusic(playlist):void {
    this.getPlaylist.getMusic(playlist).subscribe(response => {
      this.getSongInfo(response.playlist.songs);
      console.log(response);
    });
  };
   public getSongInfo(songsList):void {
     this.result = songsList.filter(songData => songData.url === this.currentSongUrl);
  }
   public getCurrentLineIndex(index):void {
    this.currentLine = index;
  }
 //   public playerStart(url):void {
 //     this.data.currPlayList(this.sortResult, index);
 //     this.currentPlayingSong();
 // }
}
