import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationInfoService } from '../services/navigation-info.service';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationInfo;
  defaultFilters: any[] = [];
  defaultAciveFiltersList: any[] = [];
  id;
  songsList: any = null;
  showNavigation: boolean;
  constructor(private getPlaylist: NavigationInfoService, 
              private router:Router,
              private data: DataService,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.getNavigation();
      this.route.queryParams.subscribe(params => {   
          this.defaultFilters = Object.keys(params).map(val => params[val]); 
          this.defaultAciveFiltersList = Object.keys(params);
     });
     this.data.getCurrentNestedRoute().subscribe(params =>{
      this.id =  params.playList;
        this.getMusic(params.playList);
     });
  }
   public getMusic(playlist):void {
    this.getPlaylist.getMusic(playlist).subscribe(response => {
      this.songsList =  response.playlist.songs;
         this.data.passPlaylist(response);
    });
  };
  getNavigation() {
    this.getPlaylist.getUI().subscribe(response => {
          this.navigationInfo = response;
    });
  }
   getFilters(filter,param, page?) {
     this.router.navigate(['songs-tile/'+ this.id], { queryParams: { [filter]: param }, queryParamsHandling: 'merge' });
 }
}

