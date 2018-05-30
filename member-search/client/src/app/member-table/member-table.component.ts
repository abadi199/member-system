import { Component, OnInit, Input } from "@angular/core";
import { Member } from "../models/member";
import { ISuccessComponent } from "../remote-data/remote-data.component";

@Component({
  selector: "app-member-table",
  template: `
  <div *ngIf="!data.length">No members found</div>
  <div *ngIf="data.length">
    <h2>Members</h2>
    <table>
      <thead>
        <tr><th>First Name</th><th>Last Name</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let member of data">
          <td>{{member.firstName}}</td>
          <td>{{member.lastName}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: []
})
export class MemberTableComponent
  implements OnInit, ISuccessComponent<Member[]> {
  @Input() data: Member[];

  constructor() {}

  ngOnInit() {}
}
