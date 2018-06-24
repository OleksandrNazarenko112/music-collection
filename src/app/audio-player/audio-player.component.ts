import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  audio: any;
  duration: any;
  elapsed: any;
  currentSongUrl = '../assets/music/Portugal-The-Man-Feel-It-Still.mp3'
  constructor() { }

   ngOnInit(): void {
     this.initAudioPlayer();
     this.audio.volume = 0.7;
  }
  initAudioPlayer(): void {
    this.audio = new Audio(this.currentSongUrl);
  }
  togglePlay() {
     if (this.audio.paused) {
       this.audio.play();
       this.culcSongDuration();
       this.currentTimeUpdate();
       this.formatTime();
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



