import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2/angularfire2";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthenticationService {
  authInfo:any;
  uid:any;
  displayName:any;
  error:any;
  loggedIn:boolean = false;

  constructor(private af:AngularFire) {
    af.auth.subscribe(res=> {
      if (res) {
        this.authInfo = res;
        this.loggedIn = true;
        this.uid=res.uid;
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
      console.log("login", authData);
      this.uid = authData.uid;
      this.loggedIn = true;
      if (addUser) {
        const itemObservable = this.af.database.object('/users/' + authData.uid);
        itemObservable.set({
          "provider": authData.auth.providerData[0].providerId,
          "avatar": authData.auth.photoURL || "MISSING",
          "displayName": authData.auth.providerData[0].displayName || authData.auth.email,
        })
      }
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

  toggleFavorite(gif_id,toPush){
    let fave_list;
    // console.log("toggleFaves inside",gif_id,toPush);
  if(this.isLoggedIn()){
    var favorites = this.af.database.list('/users/' + this.uid + '/favorites');
    favorites.subscribe(res=>fave_list = res);
    fave_list = fave_list.filter(function (o) {
      // console.log(o.url,toPush.url);
      return o.$key === toPush.id;
    });
    // console.log("fave_list",fave_list);
    if (fave_list.length == 0) {
      favorites.update(gif_id, toPush).then((_data) => {
        console.log(_data);
      }).catch((_error) => {
        console.log(_error)
      });
    } else {
      favorites.remove(gif_id).then((_data) => {
        console.log(_data);
      }).catch((_error) => {
        console.log(_error)
      });
    }
  }

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
