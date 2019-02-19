import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private router: Router, public membersService: MembersService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('memberId')) {
        console.log('What mode am I in? ' + this.mode);
        this.mode = 'edit';
        console.log('I\'m now in ' + this.mode + ' mode.');
        this.memberId = paramMap.get('memberId');
        console.log('And this is the memberId: ' + this.memberId);
        this.membersService.getMember(this.memberId).subscribe((memberData) => {
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
        });
      } else {
        this.mode = 'create';``
        console.log('You are in create mode. Mode = ' + this.mode);
        this.memberId = null;
        console.log('You are in create mode. memberId = ' + this.memberId);
      }
    });
  }

  onSaveMember(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.membersService.addMember(
        form.value.email,
        form.value.firstName,
        form.value.lastName,
        form.value.age,
        form.value.gender,
        form.value.bio
      );
    } else {
      this.membersService.updateMember(
        this.memberId,
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
