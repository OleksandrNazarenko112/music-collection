import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private currentSongsArray = new BehaviorSubject('');
  private currentSongIndex = new BehaviorSubject('');
  private currentSongUrl = new BehaviorSubject('');
  private isSongPlaying = new BehaviorSubject('')
  playlist = this.currentSongsArray.asObservable();
  songIndex = this.currentSongIndex.asObservable();
  nowPlaying = this.currentSongUrl.asObservable();
  isPlaying = this.isSongPlaying.asObservable();
 // private currentSongsArray = new Subject<any>();
 private currentNestedRoute = new Subject<any>();
    constructor() {
    }

  currPlayList(songs: any, index:any) {
     this.currentSongsArray.next(songs);
     this.currentSongIndex.next(index);
  }
  currentSong(url: any, play: any) {
    this.currentSongUrl.next(url);
    this.isSongPlaying.next(play)
    console.log('url', play);
  }
  // getCurrPlayList(songs: any, index:any) {
  //   return this.currentSongsArray.asObservable();
  // }
  passCurrentNestedRoute(route: any){
   this.currentNestedRoute.next(route);
  }
  getCurrentNestedRoute() {
    return this.currentNestedRoute.asObservable();
  }
}
