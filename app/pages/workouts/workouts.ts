import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WorkoutsService} from "../../services/workout.service";

@Component({
  providers: [WorkoutsService],
  templateUrl: 'build/pages/workouts/workouts.html'
})
export class WorkoutsPage implements OnInit {
  workouts=[];

  ngOnInit() {
    this._workoutService.getWorkouts().subscribe(workouts=>this.workouts = workouts);
  }

  constructor(private navCtrl:NavController, private _workoutService:WorkoutsService) {
  }
}
