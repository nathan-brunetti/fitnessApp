import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { MemberProfile } from '../member.model';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-profile-info',
  templateUrl: './member-profile-info.component.html',
  styleUrls: ['./member-profile-info.component.css']
})
export class MemberProfileInfoComponent implements OnInit, OnDestroy {
  // members = [
  //   {
  //     title: 'First Title',
  //     subTitle: 'First Sub-Title',
  //     memberImage: '',
  //     content: 'This is the content for the first card'
  //   }
  // ];
  members: MemberProfile[] = [];
  isLoading = false;
  private membersSub: Subscription;

  // Dependency Injections
  constructor( public membersService: MembersService, private router: Router ) {}

  ngOnInit() {
    this.isLoading = true;
    this.membersService.getMembers();
    this.membersSub = this.membersService.getMemberUpdateListener()
      .subscribe((members: MemberProfile[]) => {
        this.isLoading = false;
        this.members = members;
      });
  }

  onDeleteMember(memberId: string) {
    this.membersService.deleteMember(memberId);
  }

  ngOnDestroy() {
    this.membersSub.unsubscribe();
  }
}
