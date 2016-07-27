import {Component, OnInit} from '@angular/core';
import {NavController, ActionSheet, Platform, Alert, Loading, Toast, Keyboard} from 'ionic-angular';
import {Clipboard} from "ionic-native/dist/index";
import {FooterComponent} from "../footer/footer";
import {GiphyService} from "../../services/giphy.service";

@Component({
  directives:[FooterComponent],
  templateUrl: 'build/pages/search/search.html'
})
export class SearchPage implements OnInit {
  gifs = [];
  ratingRadioResult:String = 'any';
  query:String;
  isLoading:boolean = false;
  loading:Loading;

  ngOnInit() {
    // this._giphyService.getGifBySearch().subscribe(gifs=>this.gifs = gifs);
  }

  constructor(private _keyboard:Keyboard, private navCtrl:NavController, public platform:Platform, private _giphyService:GiphyService) {
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

  doSearch(value) {
    this._keyboard.close();
    // this.query = event.target.value;
    this.query = value;
    if (this.query && this.query != '') {
      this.toggleLoading();
      this._giphyService.getGifBySearch(this.query, this.ratingRadioResult).subscribe(gifs=> {
        this.gifs = gifs.data;
        console.log(gifs);
        this.toggleLoading();
      });
    }
  }


  openMenu() {
    let actionSheet = ActionSheet.create({
      title: "Stick Yo' GIF",
      cssClass: 'search',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this.navCtrl.present(actionSheet);
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

  // loading() {
  //   let loading = Loading.create({
  //     content: "GIF Grinding...",
  //     dismissOnPageChange: true
  //   });
  // }

  toggleLoading() {
    if (!this.isLoading) {
      this.loading = Loading.create({
        content: "GIF Grinding...",
        dismissOnPageChange: true
      });
      this.navCtrl.present(this.loading);
    }
    else this.loading.dismiss();
    this.isLoading = !this.isLoading;
  }
}
