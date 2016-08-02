import {Modal, NavController, Page} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginPage} from '../login/login'
import {MomentDate} from '../../lib/MomentDate'
import 'rxjs';


import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {TabsPage} from "../tabs/tabs";
import {AuthenticationService} from "../../services/authenticationService";

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [MomentDate]
})
export class HomePage {

  constructor(public af:AngularFire,
              public navCtrl:NavController,
              private _authService:AuthenticationService) {
    // dont do anything heavy here... do it in ngOnInit
  }

  ionViewLoaded() {

    // subscribe to the auth object to check for the login status
    // of the user, if logged in, save some user information and
    // execute the firebase query...
    // .. otherwise
    // show the login modal page
    // if (this._authService.isLoggedIn()) {
    //   this.navCtrl.push(TabsPage);
    // } else {
    //   this.displayLoginModal()
    // }
  }

  /**
   * displays the login window
   */
  displayLoginModal() {
    let loginPage = Modal.create(LoginPage);
    this.navCtrl.present(loginPage);
  }

  /**
   * adds a new item to firebase /textItems
   *
   * pass in the auth information to the modal to associate the user with the newly
   * created entry
   */
  // addNewItemClicked(_data) {
  //   let newItemPage = Modal.create(NewItemModal, {"user": this.authInfo});
  //   this.navCtrl.present(newItemPage);
  // }

  /**
   * logs out the current user
   */
}
