import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NavigationInfoService {

    constructor( private http: HttpClient) {};

    public getUI(): Observable<any> {
      return this.http.get('./assets/navigation-info.json');
    };

    public getMusic(playlist): Observable<any> {
      return this.http.get('./assets/'+ playlist +'.json');
    };
}
