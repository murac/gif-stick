import {Modal, NavController, Page, ViewController} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {TabsPage} from "../tabs/tabs";
import {AuthenticationService} from "../../services/authenticationService";

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
// _authService:AuthenticationService;
  error:any;

  constructor(public af:AngularFire,
              public viewCtrl:ViewController,
              private _navCtrl:NavController,
              private _authService:AuthenticationService) {
    // this._authService=_authService;
  }

  /**
   * this will dismiss the modal page
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * this create in the user using the form credentials.
   *
   * we are preventing the default behavor of submitting
   * the form
   *
   * @param _credentials {Object} the email and password from the form
   * @param _event {Object} the event information from the form submit
   */
  registerUser(_credentials, _event) {
    _event.preventDefault();


    this._authService.createUser(_credentials);
    if(this._authService.isLoggedIn()) this._navCtrl.push(TabsPage);

  }

  /**
   * this logs in the user using the form credentials.
   *
   * if the user is a new user, then we need to create the user AFTER
   * we have successfully logged in
   *
   * @param _credentials {Object} the email and password from the form
   * @param _event {Object} the event information from the form submit
   */
  login(_credentials, _event) {
    _event.preventDefault();
    // let moveOn;
    this._authService.login(_credentials);
    // setTimeout(()=>{
    //   if(moveOn) this._navCtrl.push(TabsPage);
    // },2000);
    if(this._authService.isLoggedIn()) this._navCtrl.push(TabsPage);



  }
}
