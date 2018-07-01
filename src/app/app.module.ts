import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MainComponent } from './main.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { NavigationInfoService } from './services/navigation-info.service';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { TileContentViewComponent } from './tile-content-view/tile-content-view.component';
import { ReactiveFormsModule } from '@angular/forms';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    MainComponent,
    AudioPlayerComponent,
    NavigationComponent,
    TileContentViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
     loader: {
       provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class appModule { }
