import {Component, Input} from '@angular/core';
import {Clipboard, SocialSharing} from "ionic-native";
import {NotifyService} from "../../services/notify";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs/Rx";
import {AuthenticationService} from "../../services/authenticationService";

@Component({
  selector: 'gif-card',
  templateUrl: 'build/pages/gif-card/gif-card.html'
})
export class GifCardComponent {
  @Input() gif;
  img_url:string;
  single:boolean;
  favorites:Observable<any[]>;

  constructor(private _notifyService:NotifyService, private _platform:Platform, private _authService:AuthenticationService) {
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
    // console.log("togggleFave",gif);
    let toPush = {id:gif.id,url: gif.url, image_url: '', timestamp: new Date().getTime()};
    let gif_id = gif.id;
    if (gif.images) {
      toPush.image_url = gif.images.fixed_width.url;
    }
    else {
      toPush.image_url = gif.image_url;
    }
    this._authService.toggleFavorite(gif_id,toPush);

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
