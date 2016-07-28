import {Injectable} from '@angular/core';
import {Toast} from "ionic-native";

@Injectable()
export class NotifyService {

  constructor() {
  }

  doNotify(message) {
    Toast.show(message, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
