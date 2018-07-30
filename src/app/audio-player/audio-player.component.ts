import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
 public audio: any = null;
 public duration: any = null;
 public elapsed: any;
 public playList: any;
 public index: number = null;
 public loading: boolean = true;
 public isPlaying: boolean;
 public audioCurrentTime: number = null;

  @ViewChild('audioPlayer') audioPlayerRef: ElementRef;
  @ViewChild('audoPlayerContainer') audoPlayerContainer: ElementRef;

  constructor(private data: DataService) {}
  public ngOnInit(): void {
     this.audio = this.audioPlayerRef.nativeElement;
     this.audio.volume = localStorage.getItem('valume') || 0.7;
     this.playlistData(); 
     this.nextSong();
     this.loadingAudio();
  }
  public playlistData(): void {
      this.data.songIndex.subscribe((index: number) => {  
        this.index = index; 
      });
      this.data.playlist.subscribe((songs:any) => {   
         this.playList = songs; 
         if(songs) {
           setTimeout(()=>{ this.togglePlay(); }, 100)  
         }
      });
  }
  public togglePlay(): void { 
      this.data.passPlayerHeight(this.audoPlayerContainer.nativeElement.offsetHeight);                  
     if (this.audio.paused) {
       this.audio.play();
       this.isPlaying = true;
       this.currentTimeUpdate();
       this.formatTime();
      } else {  
       this.audio.pause();
       this.isPlaying = false;
      }
     this.currentSongUrl();
    }
  public culcSongDuration(): void {
      let minutes, seconds;
      minutes = Math.floor(this.audio.duration / 60)
      seconds = Math.round(this.audio.duration % 60);
      if (isNaN(this.audio.duration)) {
         this.duration = '0:00'
      } else {
      seconds = (seconds >= 10) ? seconds : '0' + seconds;
      this.duration = minutes  + ':' + seconds;
      }
    }
 public skipTime(time): void {
      this.audio.currentTime = time;
    }
 public setVolume(volume): void {
      localStorage.setItem('valume', volume);
      this.audio.volume = localStorage.getItem('valume');
       if((this.audio.muted && this.audio.volume > 0) || this.audio.volume == 0) {
            this.audio.muted = !this.audio.muted;
        }
    }
 public formatTime(): void {
      this.loading = false;
      let minutes, seconds;
      seconds = Math.round(this.audio.currentTime);
      minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : '0' + seconds;
      this.elapsed = minutes + ':' + seconds;
      this.audioCurrentTime = this.audio.currentTime; //fix for safari
      this.culcSongDuration();
  }
 public currentTimeUpdate(): void { 
      this.audio.addEventListener('timeupdate', (event) => {
      this.formatTime();
        }, false);
  }
 public nextSong(): void { 
      this.audio.addEventListener('ended', (event) => {
      this.index++;
      this.audio.pause();
      if(this.index >= this.playList.length) {
         this.index = this.index -1;
      }else{
       setTimeout(()=>{ this.audio.play(); }, 500)
      }
      this.currentSongUrl();
    });
  }
 public mute(): void {
      this.audio.muted = !this.audio.muted;
      if(this.audio.muted) {
        this.audio.volume = 0;
      } 
      if(!this.audio.muted) {
        this.audio.volume = localStorage.getItem('valume') || 0.7;
      }
    }
 public loadingAudio(): void {
     this.audio.addEventListener('waiting', (event) => {
      this.loading = true; 
    })
  }
 public skipSong() {
    if (this.index + 1 >= this.playList.length){
      return false;
    } else {
       this.index++;
       this.currentSongUrl();
       if(this.isPlaying) {
        setTimeout(()=>{ this.audio.play(); }, 500);
       }
    }      
  }
 public prevSong() {
    if (this.index == 0) {
        return false;
    } else {
    this.index--;
    this.currentSongUrl();
    if (this.isPlaying) {
      setTimeout(()=>{ this.audio.play(); }, 500);
    }
  }
}
 public currentSongUrl(): void {
    this.data.currentSong(this.playList[this.index].url, this.isPlaying);
  }
}

