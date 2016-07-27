import {Component, OnInit} from '@angular/core';
import {NavController, Platform, Toast} from 'ionic-angular';
import {GiphyService} from "../../services/giphy.service";
import {FooterComponent} from "../footer/footer";
import {Clipboard} from "ionic-native/dist/index";

@Component({
  directives: [FooterComponent],
  templateUrl: 'build/pages/random/random.html'
})
export class RandomPage {
  gif=[];
  ratingRadioResult:String = 'any';
  query:String = '';

  doSearch(value) {
    this.query = value;
    if (this.query && this.query != '') {
      this._giphyService.getRandomGifs(value, this.ratingRadioResult).subscribe(gif=> {
        this.gif = gif.data;
        console.log(gif);
      });
    }
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
