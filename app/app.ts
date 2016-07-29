import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {GiphyService} from "./services/giphy.service";
import {NotifyService} from "./services/notify";
import {
  FIREBASE_PROVIDERS, defaultFirebase, AuthProviders, AuthMethods,
  firebaseAuthConfig
} from "angularfire2/angularfire2";
import {HomePage} from "./pages/home/home";


@Component({
  providers: [GiphyService, NotifyService],
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [FIREBASE_PROVIDERS,
  // Initialize Firebase app
  defaultFirebase({
    apiKey: "AIzaSyAhTIkrxs7LbJF9t8LnECJmNEgqqF0-FIQ",
    authDomain: "gif-stick.firebaseapp.com",
    databaseURL: "https://gif-stick.firebaseio.com",
    storageBucket: "gif-stick.appspot.com"
  }),
  firebaseAuthConfig({
    provider: AuthProviders.Google,
    method: AuthMethods.Popup})]);
