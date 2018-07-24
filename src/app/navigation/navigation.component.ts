import { Component, OnInit } from '@angular/core';
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
  constructor(private _getNav: NavigationInfoService, 
              private router:Router,
              private data: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getJson();
      this.route.queryParams.subscribe(params => {   
          this.defaultFilters = Object.keys(params).map(val => params[val]); 
          this.defaultAciveFiltersList = Object.keys(params);
     });
     this.data.getCurrentNestedRoute().subscribe(params =>{
       this.id =  params.playList;
     });
  }
  getJson() {
    this._getNav.getJSON().subscribe(response => {
          this.navigationInfo = response;
    });
  }
   getFilters(filter,param) {
   this.router.navigate(['songs-tile/'+ this.id], { queryParams: { [filter]: param}, queryParamsHandling: 'merge' });
 }
}

