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
  constructor(private _getNav: NavigationInfoService, private router:Router) { }
  filterArray: any[]=[];
  filterParam =[];
  ngOnInit() {
    this.getJson();
  }
  getJson() {

    this._getNav.getJSON().subscribe(response => {
          this.navigationInfo = response;

    });

  }
  getFilters(filter,param) {
                let navigationExtras: NavigationExtras = {
            queryParams: {
                
            }
        };
        navigationExtras.queryParams.filter = Array.from(new Set(this.filterArray));
    this.filterParam.push(filter);
    this.filterArray.push(param);
    this.router.navigate(['songs-tile'], navigationExtras );
console.log('массив поиска', navigationExtras.queryParams.filter);
 }
}
