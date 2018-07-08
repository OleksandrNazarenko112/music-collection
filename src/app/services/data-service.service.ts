import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private currentSongsArray = new BehaviorSubject('');
  private currentSongIndex = new BehaviorSubject('');
  playlist = this.currentSongsArray.asObservable();
  songIndex = this.currentSongIndex.asObservable();

    constructor() {
    }

  currPlayList(songs: any, index:any) {
     this.currentSongsArray.next(songs);
     this.currentSongIndex.next(index);
  }
}
