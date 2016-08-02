import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, MenuController, Nav, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {GiphyService} from "./services/giphy.service";
import {NotifyService} from "./services/notify";
import {
  FIREBASE_PROVIDERS, defaultFirebase, AuthProviders, AuthMethods,
  firebaseAuthConfig, AngularFire
} from "angularfire2/angularfire2";
import {LoginPage} from "./pages/login/login";
import {AuthenticationService} from "./services/authenticationService";

interface PageObj {
  title:string;
  component:any;
  icon:string;
  index?:number;
}

@Component({
  providers: [GiphyService, NotifyService, AuthenticationService],
  templateUrl: 'build/app.html',
})
export class MyApp {
  // _authService:AuthenticationService;

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav:Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages:PageObj[] = [
    {title: 'Search', component: TabsPage, icon: 'search'},
    {title: 'Trending', component: TabsPage, index: 1, icon: 'trending-up'},
    {title: 'Random', component: TabsPage, index: 2, icon: 'shuffle'}
  ];
  loggedInPages:PageObj[] = [
    {title: 'Favorites', component: TabsPage, index: 3, icon: 'star'},
    {title: 'Logout', component: TabsPage, icon: 'log-out'}
  ];
  loggedOutPages:PageObj[] = [
    {title: 'Login', component: LoginPage, icon: 'log-in'}
    // { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  rootPage:any;

  constructor(private platform:Platform,
              private menu:MenuController,
              private _authService:AuthenticationService) {
    // this._authService=_authService;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    // decide which menu items should be hidden by current login status stored in local storage
    console.log("const");
    this._authService.getAuthData().subscribe(res=> {
      console.log(res);
      if (res) {
        this.enableMenu(true);
        this.rootPage = TabsPage;
      }
      else {
        this.enableMenu(false);
        this.rootPage = LoginPage;
      }
    });
    // let authInfo = _authService.getAuthData();


  }

  openPage(page:PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    }
    else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this._authService.logout();
        this.enableMenu(false);
      }, 1000);
    }
  }


  enableMenu(loggedIn) {
    console.log(this.menu);
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
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
  firebaseAuthConfig(
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Redirect
    }
  )], {
  tabbarPlacement: 'bottom'
});
