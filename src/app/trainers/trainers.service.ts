import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { TrainerProfile } from './trainers.model';
import { strictEqual } from 'assert';

@Injectable({providedIn: 'root'})
export class TrainersService {
  private trainers: TrainerProfile[] = [];
  private trainersUpdated = new Subject<TrainerProfile[]>();

  constructor(private http: HttpClient) {}

  getTrainers() {
    this.http.get<{message: string, trainers: any}>('http://localhost:3000/api/trainers')
      .subscribe((trainerData) => {
        this.trainers = trainerData.trainers;
        this.trainersUpdated.next([...this.trainers]);
      })
  }

  getTrainer(_id: string) {
    return this.http
      .get<{ _id: string, email: string, firstName: string, lastName: string, age: number, gender: string, bio: string }>('http://localhost:3000/api/trainers/' + _id);
  }

  getTrainerUpdateListener() {
    return this.trainersUpdated.asObservable();
  }

  addTrainer(email: string, firstName: string, lastName: string, age: number, gender: string, bio: string) {
    const trainer: TrainerProfile = {
        _id: null,
        email: email,
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        bio: bio
      };
    this.http
      .post<{ message: string, trainerId: string }>('http://localhost:3000/api/trainers', trainer)
      .subscribe(responseData => {
        const _id = responseData.trainerId;
        trainer._id = _id;
        this.trainers.push(trainer);
        this.trainersUpdated.next([...this.trainers]);
      });
  }

  updateTrainer(_id: string, email: string, firstName: string, lastName: string, age: number, gender: string, bio: string) {
    const trainer: TrainerProfile = { _id: _id, email: email, firstName: firstName, lastName: lastName, age: age, gender: gender, bio: bio };
    // Backend request to send this request
    this.http.put('http://localhost:3000/api/members/' + _id, trainer)
      .subscribe(response => {
        // clone member array and store it in a constant
        const updatedTrainers = [...this.trainers];
        // search for the old post version by its ID
        const oldTrainerIndex = updatedTrainers.findIndex(t => t._id === trainer._id);
        // updated members for that old member index equals the new member
        updatedTrainers[oldTrainerIndex] = trainer;
        // asign updatedMembers to members
        this.trainers = updatedTrainers;
        // tell my app about it by sending a copy of the updated members
        this.trainersUpdated.next([...this.trainers]);
      });
  }

  deleteTrainer(trainerId: string) {
    this.http.delete('http://localhost:3000/api/trainers/' + trainerId)
      .subscribe(() => {
        const updatedTrainers = this.trainers.filter(trainer => trainer._id != trainerId);
        this.trainers = updatedTrainers;
        this.trainersUpdated.next([...this.trainers]);
      })
  }
}
