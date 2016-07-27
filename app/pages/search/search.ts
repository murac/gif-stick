import {Component, OnInit} from '@angular/core';
import {NavController, ActionSheet, Platform, Alert, Loading} from 'ionic-angular';
import {GiphyService} from "../../services/giphy.service";

@Component({
  providers: [GiphyService],
  templateUrl: 'build/pages/search/search.html'
})
export class SearchPage implements OnInit {
  gifs = [];
  ratingRadioOpen:boolean;
  ratingRadioResult = 'any';
  query:String;
  isLoading:boolean = false;
  loading:Loading;

  ngOnInit() {
    // this._giphyService.getGifBySearch().subscribe(gifs=>this.gifs = gifs);
  }

  constructor(private navCtrl:NavController, public platform:Platform, private _giphyService:GiphyService) {
  }

  doSearch(event) {
    this.query = event.target.value;
    if (this.query && this.query != '') {
      this.toggleLoading();
      this._giphyService.getGifBySearch(this.query, this.ratingRadioResult).subscribe(gifs=> {
        this.gifs = gifs.data;
        console.log(gifs);
        this.toggleLoading();
      });
    }
  }

  doRating() {
    let alert = Alert.create();
    alert.setTitle('Filter Rating');

    alert.addInput({
      type: 'radio',
      label: 'any',
      value: 'any',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Kids',
      value: 'y'
    });

    alert.addInput({
      type: 'radio',
      label: 'G',
      value: 'g'
    });

    alert.addInput({
      type: 'radio',
      label: 'PG',
      value: 'pg'
    });

    alert.addInput({
      type: 'radio',
      label: 'PG-13',
      value: 'pg-13'
    });

    alert.addInput({
      type: 'radio',
      label: 'R',
      value: 'r'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.ratingRadioOpen = false;
        this.ratingRadioResult = data;
      }
    });

    this.navCtrl.present(alert).then(() => {
      this.ratingRadioOpen = true;
    });
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

  copyToClipboard(gif) {

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
