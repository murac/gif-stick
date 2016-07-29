import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";

@Component({
  templateUrl: 'build/pages/favorites/favorites.html',
})
export class FavoritesPage {
  animals: FirebaseListObservable<any[]>;
  private af;
  constructor(private navCtrl: NavController, af:AngularFire) {
    this.af = af;
  }
  login() {
    this.af.auth.login();
  }
}
