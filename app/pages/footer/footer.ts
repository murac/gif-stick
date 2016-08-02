import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Alert, NavController, ViewController, MenuController} from "ionic-angular";

@Component({
  selector: 'gif-footer',
  templateUrl: 'build/pages/footer/footer.html'
})
export class FooterComponent {
  ratingRadioOpen = false;
  curView;
  @Input() totalPages=0;
  @Input() curPage=0;
  @Output() ratingRadioEmitter = new EventEmitter<string>();
  @Output() refreshEmitter = new EventEmitter<string>();
  @Output() pageChangeEmitter = new EventEmitter<number>();

  constructor(private navCtrl:NavController, private _viewCtrl:ViewController) {
    //noinspection TypeScriptUnresolvedVariable
    this.curView = _viewCtrl.name;
    console.log(this.curView);
  }

  nextPage() {
    this.pageChangeEmitter.emit(this.curPage + 1);
  }

  prevPage() {
    this.pageChangeEmitter.emit(this.curPage - 1);

  }

  doRating() {
    let alert = Alert.create();
    alert.setTitle('Filter Rating');

    alert.addInput({
      type: 'radio',
      label: 'any',
      value: 'any',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Kids',
      value: 'y'
    });

    alert.addInput({
      type: 'radio',
      label: 'G',
      value: 'g'
    });

    alert.addInput({
      type: 'radio',
      label: 'PG',
      value: 'pg'
    });

    alert.addInput({
      type: 'radio',
      label: 'PG-13',
      value: 'pg-13'
    });

    alert.addInput({
      type: 'radio',
      label: 'R',
      value: 'r'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.ratingRadioOpen = false;
        this.ratingRadioEmitter.emit(data);
      }
    });

    this.navCtrl.present(alert).then(() => {
      this.ratingRadioOpen = true;
    });
  }

  refresh() {
    let data = "refresh";
    this.refreshEmitter.emit(data);
  }
}
