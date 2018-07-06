import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private currentSongsArray = new BehaviorSubject('');
  playlist = this.currentSongsArray.asObservable();

    constructor() {
    }

  currPlayList(songs: any) {
     this.currentSongsArray.next(songs);
  }
}
