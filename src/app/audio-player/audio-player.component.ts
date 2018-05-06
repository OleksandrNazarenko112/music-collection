import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  audio;
  songDuration;
  songDurationSeconds;
  progressTimeMinutes;
  progressTimeSeconds;
  timeLeftCounter;
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
        this.timeLeft();
      } else {  
        this.audio.pause();
         this.timeLeft();
        clearInterval(this.timeLeftCounter);
      }

    }
    culcSongDuration() {
       this.songDurationSeconds = Math.round(((this.audio.duration - Math.floor(this.audio.duration/60)*60)));
       if (this.songDurationSeconds.toString().length <= 1) {
           this.songDurationSeconds =  '0' + this.songDurationSeconds;
       }
       this.songDuration =  Math.floor(this.audio.duration/60) + ':' + this.songDurationSeconds;
    }
    timeLeft() {
        this.timeLeftCounter = setInterval(() => {
          this.audio.currentTime;
          this.progressTimeSeconds = Math.round(this.audio.currentTime);

          if (this.progressTimeSeconds >= 60 ) {
            this.progressTimeSeconds = this.progressTimeSeconds - (60*this.progressTimeMinutes);
          }
          this.progressTimeMinutes = Math.floor(this.audio.currentTime/60);

      }, 1);
      
    }
    skipTime(time) {
      this.audio.currentTime = time;
    }
    setVolume(volume) {
        this.audio.volume = volume / 100;
    }
}



