import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { MemberProfile } from './member.model';
import { strictEqual } from 'assert';

@Injectable({providedIn: 'root'})
export class MembersService {
  private members: MemberProfile[] = [];
  private membersUpdated = new Subject<MemberProfile[]>();

  constructor(private http: HttpClient) {}

  getMembers() {
    this.http.get<{message: string, members: any}>('http://localhost:3000/api/members')
      .subscribe((memberData) => {
        this.members = memberData.members;
        this.membersUpdated.next([...this.members]);
      });
  }

  getMember(_id: string) {
    return this.http
      .get< {_id: string,
        email: string,
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
        bio: string }>('http://localhost:3000/api/members/' + _id);
  }

  getMemberUpdateListener() {
    return this.membersUpdated.asObservable();
  }

  addMember(email: string, firstName: string, lastName: string, age: number, gender: string, bio: string) {
    const member: MemberProfile = {
        _id: null,
        email: email,
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        bio: bio
      };
    this.http
      .post<{ message: string, memberId: string}>('http://localhost:3000/api/members', member)
      .subscribe(responseData => {
        const _id = responseData.memberId;
        member._id = _id;
        this.members.push(member);
        this.membersUpdated.next([...this.members]);
      });
  }

  updateMember(_id: string, email: string, firstName: string, lastName: string, age: number, gender: string, bio: string) {
    const member: MemberProfile = { _id: _id, email: email, firstName: firstName, lastName: lastName, age: age, gender: gender, bio: bio };
    // Backend route to send this request
    this.http.put('http://localhost:3000/api/members/' + _id, member)
      .subscribe(response => {
        // clone member array and store it in a constant
        const updatedMembers = [...this.members];
        // search for the old post version by its ID
        const oldMemberIndex = updatedMembers.findIndex(m => m._id === member._id);
        // updated members for that old member index equals the new member
        updatedMembers[oldMemberIndex] = member;
        // asign updatedMembers to members
        this.members = updatedMembers;
        // tell my app about it by sending a copy of the updated members
        this.membersUpdated.next([...this.members]);
      });
  }

  deleteMember(memberId: string) {
    this.http.delete('http://localhost:3000/api/members/' + memberId)
      .subscribe(() => {
        const updatedMembers = this.members.filter(member => member._id !== memberId);
        this.members = updatedMembers;
        this.membersUpdated.next([...this.members]);
      });
  }
}
