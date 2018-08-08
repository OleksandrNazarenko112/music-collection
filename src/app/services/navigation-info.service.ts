import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class NavigationInfoService {

    constructor(private http: Http) {
    }

    public getUI(): Observable<any> {
      return this.http.get('./assets/navigation-info.json').pipe(map((response: any) => {
        return response.json();
    }));

     }
    public getMusic(playlist): Observable<any> {
      return this.http.get('./assets/'+ playlist +'.json').pipe(map((response: any) => {
        return response.json();
    }));

     }
}
