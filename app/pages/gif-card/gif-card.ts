import {Component, Input} from '@angular/core';
import {Clipboard, SocialSharing} from "ionic-native";
import {NotifyService} from "../../services/notify";
import {Platform} from "ionic-angular";
import {AngularFire} from "angularfire2/angularfire2";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'gif-card',
  templateUrl: 'build/pages/gif-card/gif-card.html'
})
export class GifCardComponent {
  @Input() gif;
  img_url:string;
  single:boolean;
  favorites:Observable<any[]>;

  constructor(private _notifyService:NotifyService, private _platform:Platform, private _af:AngularFire) {
  }

  ngOnChanges() {
    if (this.gif.images) {

      this.img_url = this._platform.isPortrait() ? this.gif.images.fixed_width.url : this.gif.images.fixed_height.url;
      this.single = true;
    }
    else {
      this.img_url = this.gif.image_url;
      this.single = false;
    }
  }


  toggleFavorite(gif) {
    let toPush = {url: '', image_url: '', timestamp: new Date().getTime()};
    let gif_id = gif.id;
    if (gif.images) {
      toPush.url = gif.url;
      toPush.image_url = gif.images.fixed_width.url;
    }
    else {
      toPush.url = gif.url;
      toPush.image_url = gif.image_url;
    }

    // let uid;
    // this._af.auth.subscribe(data=>uid = data.uid);
    //
    // let fave_list;
    //
    // var favorites = this._af.database.list('/users/' + uid + '/favorites');
    // favorites.subscribe(res=>fave_list = res);
    // fave_list = fave_list.filter(function (o) {
    //   return o.$key == gif_id;
    // });
    //
    // if (fave_list.length == 0) {
    //   favorites.update(gif_id, toPush).then((_data) => {
    //     console.log(_data);
    //   }).catch((_error) => {
    //     console.log(_error)
    //   });
    // } else {
    //   favorites.remove(gif_id).then((_data) => {
    //     console.log(_data);
    //   }).catch((_error) => {
    //     console.log(_error)
    //   });
    // }

    this._notifyService.doNotify("GIF has been starred!");
  }

  copyToClipboard(gif) {
    Clipboard.copy(this.img_url).then(function () {
      this._notifyService.doNotify("GIF copied to clipboard!");
    });

  }

  shareGif(gif) {
    let original_url = this.single ? gif.image_original_url : gif.images.original.url;
    SocialSharing.share('Message', 'Subject', original_url, gif.url);
    this._notifyService.doNotify("GIF has been shared!");
  }


}
