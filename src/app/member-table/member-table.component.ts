import { Component, OnInit, Input } from "@angular/core";
import { Member } from "../models/member";

@Component({
  selector: "app-member-table",
  template: `
  <h2>Members</h2>
  <table>
    <thead>
      <tr><th>First Name</th><th>Last Name</th></tr>
    </thead>
    <tbody>
      <tr *ngFor="let member of members">
        <td>{{member.firstName}}</td>
        <td>{{member.lastName}}</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class MemberTableComponent implements OnInit {
  @Input() members: Member[];

  constructor() { }

  ngOnInit() { }
}
