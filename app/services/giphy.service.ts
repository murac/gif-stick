import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GiphyService {
  api_key:string;
  giphyUrl:string;
  hasRating:boolean;
  limit:number=10;

  constructor(private _http:Http) {
    console.log('Service Connected...');
    this.api_key = 'dc6zaTOxFJmzC';
    this.giphyUrl = 'https://api.giphy.com/v1/gifs';
  }

  getGifBySearch(query:string, rating:string,offset:number):Observable<any> {
    let parameters = 'limit='+this.limit+'&offset='+offset+'&q=' + query.trim().replace(' ', '+');
    this.hasRating = rating == 'any' ? false : true;
    if (this.hasRating) {
      parameters += '&rating=' + rating;
    }
    let url = `${this.giphyUrl}/search?${parameters}&api_key=${this.api_key}`;
    console.log(url);
    return this._http.get(url).map(res=>res.json());
  }

  getTrendingGifs(rating:string,offset:number) {
    let parameters = 'limit='+this.limit+'&offset='+offset+'&';
    this.hasRating = rating == 'any' ? false : true;
    if (this.hasRating) {
      parameters += 'rating=' + rating + "&";
    }
    let url = `${this.giphyUrl}/trending?${parameters}api_key=${this.api_key}`;
    console.log(url);
    return this._http.get(url).map(res=>res.json());
  }

  getRandomGifs(rating:string, value:string) {
    let parameters = value !== null ? 'tag=' + value.trim().replace(' ', '+') + '&' : '';
    this.hasRating = rating == 'any' ? false : true;
    if (this.hasRating) {
      parameters += 'rating=' + rating + '&';
    }
    let url = `${this.giphyUrl}/random?${parameters}api_key=${this.api_key}`;
    console.log(url);
    return this._http.get(url).map(res=>res.json());
  }

}
