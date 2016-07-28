import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {GiphyService} from "../../services/giphy.service";
import {FooterComponent} from "../footer/footer";
import {GifCardComponent} from "../gif-card/gif-card";
import {Toast} from "ionic-native";

@Component({
  directives: [FooterComponent,GifCardComponent],
  templateUrl: 'build/pages/random/random.html'
})
export class RandomPage implements OnInit {
  gif = {meta: {msg: ''}};
  ratingRadioResult:string = 'any';
  query:string = '';

  ngOnInit():any {
    this.doSearch(null);
  }

  doSearch(query) {
    this._giphyService.getRandomGifs(this.ratingRadioResult, query).subscribe(gif=> {
      console.log(this.gif);
      this.gif = gif;
      console.log(this.gif);
    });
  }


  constructor(private navCtrl:NavController, public platform:Platform, private _giphyService:GiphyService) {
  }


}
