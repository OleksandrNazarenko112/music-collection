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

  @ViewChild('audioPlayer') audioPlayerRef: ElementRef;

  constructor(private data: DataService) { 
     }
   ngOnInit(): void {
     this.audio = this.audioPlayerRef.nativeElement;
     this.audio.volume = 0.7;
     this.playlistData(); 
  }

   playlistData() {
      this.data.songIndex.subscribe((index:any) => {  
        this.index = index; 
      });
      this.data.playlist.subscribe((songs:any) => {   
         this.playList = songs; 
         console.log(songs)
         if(songs) {
           setTimeout(()=>{ this.togglePlay(); }, 100)
          
         }
       });
  }

    togglePlay() {                      
     if (this.audio.paused) {
       this.audio.play();
       this.culcSongDuration();
       this.currentTimeUpdate();
       this.formatTime();
       this.nextSong();
      } else {  
       this.audio.pause();
      }
    }

   culcSongDuration() {
      let minutes, seconds;
      minutes = Math.floor(this.audio.duration / 60)
      seconds = Math.round(this.audio.duration % 60);
      seconds = (seconds >= 10) ? seconds : '0' + seconds;
      this.duration = minutes  + ':' + seconds;
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
      let minutes, seconds;
      seconds = Math.round(this.audio.currentTime);
      minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : '0' + seconds;
      this.elapsed = minutes + ':' + seconds;
  }

  currentTimeUpdate() { 
      this.audio.addEventListener('timeupdate', (event) => {
      this.formatTime();
        }, false);
  }
  nextSong() { 
      this.audio.addEventListener('ended', (event) => {
      this.index++;
      this.audio.play();
      console.log('next song', this.index)
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
}

