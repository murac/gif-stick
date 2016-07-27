import {Component, OnInit} from '@angular/core';
import {NavController, Platform, Toast} from 'ionic-angular';
import {GiphyService} from "../../services/giphy.service";
import {FooterComponent} from "../footer/footer";
import {Clipboard} from "ionic-native/dist/index";

@Component({
  directives: [FooterComponent],
  templateUrl: 'build/pages/trending/trending.html'
})
export class TrendingPage implements OnInit {
  gifs = [];
  ratingRadioResult:String = 'any';

  ngOnInit() {
    this.doSearch();
  }

  doSearch() {
    this._giphyService.getTrendingGifs(this.ratingRadioResult).subscribe(gifs=> {
      this.gifs = gifs.data;
    });
  }

  doNotify(message) {
    let toast = Toast.create({
      message: message,
      duration: 3000
    });

    toast.onDismiss(() => {
      console.log('Dismissed toast');
    });

    this.navCtrl.present(toast);
  }

  constructor(private navCtrl:NavController, public platform:Platform, private _giphyService:GiphyService) {
  }

  toggleFavorite(gif) {

  }

  copyToClipboard(url) {
    Clipboard.copy(url).then(function () {
      this.doNotify("GIF copied to clipboard!");
    });

  }

  shareGif(gif) {

  }

}
