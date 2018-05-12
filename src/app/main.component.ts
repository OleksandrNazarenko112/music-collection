import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { NavigationInfoService } from './services/navigation-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  title = 'app';
  navigationInfo;
  genreNav;
constructor(private translate: TranslateService, private _getNav:NavigationInfoService) {
    translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  getJson() {

    this._getNav.getJSON().subscribe(response => {
                   this.navigationInfo = response;
                   this.genreNav = response.settings.genre;
    });

  }
}
      