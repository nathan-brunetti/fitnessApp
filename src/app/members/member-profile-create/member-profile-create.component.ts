import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MembersService } from '../members.service';
import { MemberProfile } from '../member.model';

@Component({
  selector: 'app-member-profile-create',
  templateUrl: './member-profile-create.component.html',
  styleUrls: ['./member-profile-create.component.css']
})
export class MemberProfileCreateComponent implements OnInit {

  private mode = 'create';
  private memberId: string;
  private memberEmail: string;
  member: MemberProfile;
  isLoading = false;
  form: FormGroup;
  imageURL: string;

  constructor(private router: Router, public membersService: MembersService, public route: ActivatedRoute) {}

  ngOnInit() {
    // Configuring the form fields
    this.form = new FormGroup({
      'email': new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      'firstName': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      'lastName': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      'age': new FormControl(null, {
        validators: [Validators.required]
      }),
      'gender': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(1)]
      }),
      'bio': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(200)]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('memberId')) {
        console.log('What mode am I in? ' + this.mode);
        this.mode = 'edit';
        console.log('I\'m now in ' + this.mode + ' mode.');
        this.memberId = paramMap.get('memberId');
        // Show spinner
        this.isLoading = true;
        console.log('And this is the memberId: ' + this.memberId);
        this.membersService.getMember(this.memberId).subscribe((memberData) => {
          // Hide spinner
          this.isLoading = false;
          console.log('member object', memberData);
          console.log('member', memberData.email);
          this.member = {
            _id: memberData._id,
            email: memberData.email,
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            age: memberData.age,
            gender: memberData.gender,
            bio: memberData.bio
          };
          this.form.setValue({
            'email': this.member.email,
            'firstName': this.member.firstName,
            'lastName': this.member.lastName,
            'age': this.member.age,
            'gender': this.member.gender,
            'bio': this.member.bio
          });
        });
      } else {
        this.mode = 'create';
        console.log('You are in create mode. Mode = ' + this.mode);
        this.memberId = null;
        console.log('You are in create mode. memberId = ' + this.memberId);
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveMember() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.membersService.addMember(
        this.form.value.email,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.age,
        this.form.value.gender,
        this.form.value.bio
      );
    } else {
      this.membersService.updateMember(
        this.memberId,
        this.form.value.email,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.age,
        this.form.value.gender,
        this.form.value.bio
      );
    }
    this.form.reset();
  }
}
