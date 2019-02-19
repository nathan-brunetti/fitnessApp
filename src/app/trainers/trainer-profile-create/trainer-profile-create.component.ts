import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { TrainerProfile} from '../trainers.model'
import { TrainersService } from '../trainers.service';

@Component({
  selector: 'app-trainer-profile-create',
  templateUrl: './trainer-profile-create.component.html',
  styleUrls: ['./trainer-profile-create.component.css']
})
export class TrainerProfileCreateComponent implements OnInit {

  private mode = 'create';
  private trainerId: string;
  trainer: TrainerProfile;

  constructor(private router: Router, public trainersService: TrainersService, public route: ActivatedRoute) {}

  ngOnInit() {

  }

  onSaveTrainer(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.trainersService.addTrainer(
        form.value.email,
        form.value.firstName,
        form.value.lastName,
        form.value.age,
        form.value.gender,
        form.value.bio
      );
    } else {
      this.trainersService.updateTrainer(
        this.trainerId,
        form.value.email,
        form.value.firstName,
        form.value.lastName,
        form.value.age,
        form.value.gender,
        form.value.bio
      );
    }
    form.resetForm();
  }
}
