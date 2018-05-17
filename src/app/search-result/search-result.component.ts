import { Component, OnInit, Input } from "@angular/core";
import { Member } from "../models/member";
import { MemberTableComponent } from "../member-table/member-table.component";

@Component({
  selector: "app-search-result",
  template: `
  <app-member-table *ngIf="members.length" [members]="members"></app-member-table>
  `,
  styles: []
})
export class SearchResultComponent implements OnInit {
  @Input() members: Member[] = [];

  constructor() {}

  ngOnInit() {}
}
