import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GiphyService {
  api_key:String;
  giphyUrl:String;
  hasRating:boolean;

  constructor(private _http:Http) {
    console.log('Service Connected...');
    this.api_key = 'dc6zaTOxFJmzC';
    this.giphyUrl = 'http://api.giphy.com/v1/gifs';
  }

  getGifBySearch(query:String, rating:String):Observable<any> {
    let parameters = 'q=' + query.replace(' ', '+');
    this.hasRating = rating == 'any' ? false : true;
    if (this.hasRating) {
      parameters += '&rating=' + rating;
    }
    let url =`${this.giphyUrl}/search?${parameters}&api_key=${this.api_key}`;
    console.log(url);
    return this._http.get(url).map(res=>res.json());
  }

  getTrendingGifs(rating:String){
    let parameters = '';
    this.hasRating = rating == 'any' ? false : true;
    if (this.hasRating) {
      parameters += 'rating=' + rating+"&";
    }
    let url =`${this.giphyUrl}/trending?${parameters}api_key=${this.api_key}`;
    console.log(url);
    return this._http.get(url).map(res=>res.json());
  }

  getRandomGifs(rating:String){
    let parameters = '';
    this.hasRating = rating == 'any' ? false : true;
    if (this.hasRating) {
      parameters += 'rating=' + rating+'&';
    }
    let url =`${this.giphyUrl}/search?${parameters}api_key=${this.api_key}`;
    console.log(url);
    return this._http.get(url).map(res=>res.json());
  }

}
