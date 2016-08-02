import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";
import {FooterComponent} from "../footer/footer";
import {GifCardComponent} from "../gif-card/gif-card";
import {AuthenticationService} from "../../services/authenticationService";

@Component({
  directives: [FooterComponent, GifCardComponent],
  templateUrl: 'build/pages/favorites/favorites.html',
})
export class FavoritesPage implements OnInit {
  favorites:FirebaseListObservable<any[]>;
  af:AngularFire;
  uid;
  gifs;

  constructor(private navCtrl:NavController, af:AngularFire, private _authService:AuthenticationService) {
    this.af = af;

  }

  ngOnInit() {
    // this.af.auth.subscribe(data=>this.uid = data.uid);
    // this.af.database.list('users/' + this.uid + '/favorites').subscribe(data=>this.gifs = data);
    // if(this._authService.isLoggedIn()){
    if (this._authService.isLoggedIn()) this._authService.getGifs().subscribe(gifs=>this.gifs = gifs);
    // }

  }
}
