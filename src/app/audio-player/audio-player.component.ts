import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  audio: any;
  duration: any;
  elapsed: any;
  playList: any;
  index:any;
  loading = true;
  isPlaying: boolean;

  @ViewChild('audioPlayer') audioPlayerRef: ElementRef;

  constructor(private data: DataService) { 
     }
   ngOnInit(): void {
     this.audio = this.audioPlayerRef.nativeElement;
     this.audio.volume = 0.7;
     this.playlistData(); 
     this.nextSong();
     this.loadingAudio();
  }

   playlistData() {
      this.data.songIndex.subscribe((index:any) => {  
        this.index = index; 
      });
      this.data.playlist.subscribe((songs:any) => {   
         this.playList = songs; 
         if(songs) {
           setTimeout(()=>{ this.togglePlay(); }, 100)  
         }
       });
  }

    togglePlay() {                     
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

   culcSongDuration() {
      let minutes, seconds;
      minutes = Math.floor(this.audio.duration / 60)
      seconds = Math.round(this.audio.duration % 60);
      if(isNaN(this.audio.duration)) {
         this.duration = '0:00'
      } else {
      seconds = (seconds >= 10) ? seconds : '0' + seconds;
      this.duration = minutes  + ':' + seconds;
      }
    }

  skipTime(time) {
      this.audio.currentTime = time;
    }

  setVolume(volume) {
      this.audio.volume = volume;
       if((this.audio.muted && this.audio.volume > 0) || this.audio.volume == 0) {
            this.audio.muted = !this.audio.muted;
        }
    }
  formatTime() {
      this.loading = false;
      let minutes, seconds;
      seconds = Math.round(this.audio.currentTime);
      minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : '0' + seconds;
      this.elapsed = minutes + ':' + seconds;
      this.culcSongDuration();
  }

  currentTimeUpdate() { 
      this.audio.addEventListener('timeupdate', (event) => {
      this.formatTime();
        }, false);
  }
  nextSong() { 
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
  mute() {
      this.audio.muted = !this.audio.muted;
      if(this.audio.muted) {
        this.audio.volume = 0;
      } 
      if(!this.audio.muted) {
        this.audio.volume = 0.7;
      }
    }

  loadingAudio() {
     this.audio.addEventListener('waiting', (event) => {
      this.loading = true; 
    })
  }
  skipSong() {
    if(this.index+1 >= this.playList.length){
      return false;
    }else{
       this.index++;
       this.currentSongUrl();
      setTimeout(()=>{ this.audio.play(); }, 500)
    }
        
    }

  prevSong() {
    if(this.index==0){
        return false;
    } else{
    this.index--;
    this.currentSongUrl();
    setTimeout(()=>{ this.audio.play(); }, 500)
  }
}
  currentSongUrl() {
    this.data.currentSong(this.playList[this.index].url, this.isPlaying);
  }
}

