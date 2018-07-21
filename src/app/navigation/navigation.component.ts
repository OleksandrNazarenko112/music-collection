import { Component, OnInit } from '@angular/core';
import { NavigationInfoService } from '../services/navigation-info.service';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationInfo;
  defaultFilters: any[] =[];
  constructor(private _getNav: NavigationInfoService, 
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getJson();
           this.route.queryParams.subscribe(params => {   
          this.defaultFilters = Object.keys(params).map(val => params[val]); 
        console.log(params);
     });
  }
  getJson() {

    this._getNav.getJSON().subscribe(response => {
          this.navigationInfo = response;

    });

  }
  getFilters(filter,param) {
   this.router.navigate(['songs-tile'], { queryParams: { [filter]: param}, queryParamsHandling: 'merge' });

 }
}

