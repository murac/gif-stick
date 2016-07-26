import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GiphyService} from "../../services/giphy.service";

@Component({
  providers: [GiphyService],
  templateUrl: 'build/pages/giphy/giphy.html'
})
export class SearchPage implements OnInit {
  gifs=[];

  ngOnInit() {
    this._giphyService.getGifBySearch().subscribe(gifs=>this.gifs = gifs);
  }

  constructor(private navCtrl:NavController, private _giphyService:GiphyService) {
  }
}
