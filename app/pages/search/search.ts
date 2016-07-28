import {Component} from '@angular/core';
import {NavController, ActionSheet, Platform, Loading, Keyboard, Alert} from 'ionic-angular';
import {FooterComponent} from "../footer/footer";
import {GiphyService} from "../../services/giphy.service";
import {GifCardComponent} from "../gif-card/gif-card";

@Component({
  directives: [FooterComponent, GifCardComponent],
  templateUrl: 'build/pages/search/search.html'
})
export class SearchPage {
  gifs = [];
  ratingRadioResult:string = 'any';
  query:string;
  curPage = 1;
  totalPages = 0;
  count = 10;
  total_count;
  isLoading:boolean = false;
  loading:Loading;

  constructor(private _keyboard:Keyboard, private navCtrl:NavController, public platform:Platform, private _giphyService:GiphyService) {
  }

  searchInput() {
    let prompt = Alert.create({
      title: 'GifTrip!',
      message: "What would you like to see?",
      inputs: [
        {
          name: 'title',
          placeholder: 'Search'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Search',
          handler: data => {
            this.query=data.title;
            console.log(data);
            this.doSearch();
          }
        }
      ]
    });
    this.navCtrl.present(prompt);
  }

  doSearch() {
    this._keyboard.close();
    let offset;
    if (this.totalPages == 0 || this.curPage == 1) offset = 1;
    else {
      offset = this.curPage * this.count - this.count + 1;
    }
    if (this.query && this.query != '') {
      this.toggleLoading();
      this._giphyService.getGifBySearch(this.query, this.ratingRadioResult, offset).subscribe(gifs=> {
        this.gifs = gifs.data;
        console.log(this.gifs);
        this.count = gifs.pagination.count;
        this.total_count=gifs.pagination.total_count;
        this.totalPages = Math.floor(gifs.pagination.total_count / this.count);
        console.log(gifs);
        this.toggleLoading();
      });
    }
  }

  updatePage(newPage) {
    this.curPage = newPage;
    this.doSearch();
  }

  updateRating(newRating) {
    this.ratingRadioResult = newRating;
    this.doSearch();
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
