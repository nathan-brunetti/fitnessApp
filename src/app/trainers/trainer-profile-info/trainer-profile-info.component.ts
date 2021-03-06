import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { TrainerProfile } from '../trainers.model';
import { TrainersService } from '../trainers.service';

@Component({
  selector: 'app-trainer-profile-info',
  templateUrl: './trainer-profile-info.component.html',
  styleUrls: ['./trainer-profile-info.component.css']
})
export class TrainerProfileInfoComponent implements OnInit, OnDestroy {
  // members = [
  //   {
  //     title: 'First Title',
  //     subTitle: 'First Sub-Title',
  //     memberImage: '',
  //     content: 'This is the content for the first card'
  //   }
  // ];
  trainers: TrainerProfile[] = [];
  private trainersSub: Subscription;

  // Dependency Injections
  constructor( public trainersService: TrainersService, private router: Router ) {}

  ngOnInit() {
    this.trainersService.getTrainers();
    this.trainersSub = this.trainersService.getTrainerUpdateListener()
      .subscribe((trainers: TrainerProfile[]) => {
        this.trainers = trainers;
      });
  }

  onDeleteTrainer(trainerId: string) {
    this.trainersService.deleteTrainer(trainerId);
  }

  ngOnDestroy() {
    this.trainersSub.unsubscribe();
  }
}
