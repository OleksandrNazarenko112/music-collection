import { Component, OnInit } from '@angular/core';
import { NavigationInfoService } from '../services/navigation-info.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationInfo;
  constructor(private _getNav: NavigationInfoService) { }

  ngOnInit() {
    this.getJson();
  }
  getJson() {

    this._getNav.getJSON().subscribe(response => {
          this.navigationInfo = response;

    });

  }
}
