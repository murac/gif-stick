import {Component, OnInit} from '@angular/core';
import {FavoritesPage} from "../favorites/favorites";
import {SearchPage} from "../search/search";
import {RandomPage} from "../random/random";
import {TrendingPage} from "../trending/trending";
import {NavParams} from "ionic-angular/index";
import {AngularFire} from "angularfire2/angularfire2";
import {AuthenticationService} from "../../services/authenticationService";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage implements OnInit {
  mySelectedIndex;

  private searchRoot:any;
  private trendingRoot:any;
  private randomRoot:any;
  private favoritesRoot:any;
  numFaves:number = 0;
  af;
  uid;

  constructor(navParams:NavParams, af:AngularFire, private _authService:AuthenticationService) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.searchRoot = SearchPage;
    this.randomRoot = RandomPage;
    this.favoritesRoot = FavoritesPage;
    this.trendingRoot = TrendingPage;
    this.af = af;
  }

  ngOnInit() {
    console.log("Tabs");
    if (this._authService.isLoggedIn()) {
      this._authService.getGifs().subscribe(gifs=>this.numFaves = gifs.length);
    }
  }

}
