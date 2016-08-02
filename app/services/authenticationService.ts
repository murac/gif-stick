import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2/angularfire2";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthenticationService {
  authInfo:any;
  displayName:any;
  error:any;
  loggedIn:boolean = false;

  constructor(private af:AngularFire) {
    af.auth.subscribe(res=> {
      if(res) {
        this.authInfo = res;
        this.loggedIn=true;
      }
      else this.loggedIn = false;
    })
  }

  addOrUpdateUser(_authData) {
    const itemObservable = this.af.database.object('/users/' + _authData.uid);
    itemObservable.set({
      "provider": _authData.auth.providerData[0].providerId,
      "avatar": _authData.auth.photoURL || "MISSING",
      "displayName": _authData.auth.providerData[0].displayName || _authData.auth.email,
    });
  }

  createUser(_credentials) {
    return this.af.auth.createUser(_credentials)
      .then((user) => {
        console.log(`Create User Success:`, user);
        _credentials.created = true;

        return this.login(_credentials);
      })
      .catch(e => console.error(`Create User Failure:`, e));
  }

  login(credentials) {

    // if this was called from the register user,  the check if we
    // need to create the user object or not
    let addUser = credentials.created;
    credentials.created = null;

    // login usig the email/password auth provider
    return this.af.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      this.authInfo = authData;
      console.log(authData);

      if (addUser) {
        const itemObservable = this.af.database.object('/users/' + authData.uid);
        itemObservable.set({
          "provider": authData.auth.providerData[0].providerId,
          "avatar": authData.auth.photoURL || "MISSING",
          "displayName": authData.auth.providerData[0].displayName || authData.auth.email,
        })
      } else {
        // this._navCtrl.push(TabsPage);
        this.loggedIn = true;
        return true;
      }
    }).then((value) => {
      // this._navCtrl.push(TabsPage);
      this.loggedIn = true;
      return true;
    }).catch((error) => {
      this.error = error;
      console.log(error)
    });
  }

  getGifs() {
    return this.af.database.list('users/' + this.authInfo.uid + '/favorites').map(faves=>faves);
  }

  getAuthData():Observable<any> {
    return this.af.auth;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    this.authInfo = null;
    this.af.auth.logout();
  }

}
