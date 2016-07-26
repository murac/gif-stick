import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {WorkoutsPage} from "../workouts/workouts";
import {AddWorkoutPage} from "../add-workout/add-workout";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private workoutsRoot: any;
  private addWorkoutRoot: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
    this.workoutsRoot = WorkoutsPage;
    this.addWorkoutRoot = AddWorkoutPage;
  }
}
