import {Component} from '@angular/core';
import {FavoritesPage} from "../favorites/favorites";
import {SearchPage} from "../search/search";
import {RandomPage} from "../random/random";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private searchRoot: any;
  private randomRoot: any;
  private favoritesRoot: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.searchRoot = SearchPage;
    this.randomRoot = RandomPage;
    this.favoritesRoot = FavoritesPage;
  }
}
