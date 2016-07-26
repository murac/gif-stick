import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GiphyService {
  apiKey:String;
  giphyUrl:String;

  constructor(private _http:Http) {
    console.log('Service Connected...');
    this.apiKey = 'DHXPgKmwwyhBNdSFQFKqIc4fEktFGSG3';
    this.giphyUrl = 'https://api.mlab.com/api/1/databases/fauionic2/collections/workouts';
  }

  getGifBySearch():Observable {
    return this._http.get(`${this.giphyUrl}?apiKey=${this.apiKey}`).map(res=>res.json());
  }

}
