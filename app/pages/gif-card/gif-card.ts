import {Component, Input} from '@angular/core';
import {Clipboard, SocialSharing} from "ionic-native";
import {NotifyService} from "../../services/notify";
import {Platform} from "ionic-angular";

@Component({
  selector: 'gif-card',
  templateUrl: 'build/pages/gif-card/gif-card.html'
})
export class GifCardComponent{
  @Input() gif;
  img_url:string;
  single:boolean;

  constructor(private _notifyService:NotifyService,private _platform:Platform) {
  }

  ngOnChanges(){
    if(this.gif.images){

      this.img_url= this._platform.isPortrait() ? this.gif.images.fixed_width.url : this.gif.images.fixed_height.url;
      this.single=true;
    }
    else {
      this.img_url=this.gif.image_url;
      this.single=false;
    }
  }


  toggleFavorite(gif) {
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
