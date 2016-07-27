import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Alert, NavController} from "ionic-angular/index";

@Component({
  selector: 'gif-footer',
  templateUrl: 'build/pages/footer/footer.html'
})
export class FooterComponent {
  ratingRadioOpen = false;

  @Input() query:String;
  @Output() ratingRadioEmitter = new EventEmitter<String>();

  constructor(private navCtrl:NavController) {
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
        if (this.query && this.query.trim() != '') this.ratingRadioEmitter.emit(data);
      }
    });

    this.navCtrl.present(alert).then(() => {
      this.ratingRadioOpen = true;
    });
  }
}
