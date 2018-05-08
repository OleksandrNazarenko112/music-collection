import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  audio;
  duration;
  elapsed;
  currentSongUrl = '../assets/music/lana_del_rey_west_coast.mp3'
  constructor() { }

  ngOnInit() {
     this.initAudioPlayer();
  }
  initAudioPlayer() {
    this.audio = new Audio(this.currentSongUrl);
  }
  togglePlay() {
     if (this.audio.paused) {
       this.audio.play();
       this.culcSongDuration();
       this.currentTimeUpdate();
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
      this.audio.volume = volume / 100;
    }
    formatTime() {
      let minutes,seconds;
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
}



