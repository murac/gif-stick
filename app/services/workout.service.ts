import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class WorkoutsService {
  apiKey:String;
  workoutsUrl:String;

  constructor(private _http:Http) {
    console.log('Service Connected...');
    this.apiKey = 'DHXPgKmwwyhBNdSFQFKqIc4fEktFGSG3';
    this.workoutsUrl = 'https://api.mlab.com/api/1/databases/fauionic2/collections/workouts';
  }

  getWorkouts() {
    return this._http.get(`${this.workoutsUrl}?apiKey=${this.apiKey}`).map(res=>res.json());
  }

}
