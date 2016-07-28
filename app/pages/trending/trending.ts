import {Component, OnInit} from '@angular/core';
import {NavController, Platform, Loading} from 'ionic-angular';
import {GiphyService} from "../../services/giphy.service";
import {FooterComponent} from "../footer/footer";
import {GifCardComponent} from "../gif-card/gif-card";

@Component({
  directives: [FooterComponent, GifCardComponent],
  templateUrl: 'build/pages/trending/trending.html'
})
export class TrendingPage implements OnInit {
  gifs = [];
  curPage = 1;
  count = 10;
  isLoading:boolean=false;
  loading:Loading;
  paginationOn=false;
  ratingRadioResult:string = 'any';
  pagination;

  ngOnInit() {
    this.doSearch();
  }

  doSearch() {
    let offset = (this.curPage * this.count)-this.count+1;
    this.toggleLoading();
    this._giphyService.getTrendingGifs(this.ratingRadioResult, offset).subscribe(gifs=> {
      console.log(gifs);
      this.gifs = gifs.data;
      this.count = gifs.pagination.count;
      this.toggleLoading();
    });
  }

  updatePage(newPage){
    this.curPage=newPage;
    this.doSearch();
  }

  updateRating(newRating){
    this.ratingRadioResult=newRating;
    this.doSearch();
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

  constructor(private navCtrl:NavController, public platform:Platform, private _giphyService:GiphyService) {
  }
}
