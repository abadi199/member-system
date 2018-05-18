import { Component, OnInit, Input } from "@angular/core";
import { Member } from "../models/member";
import { MemberTableComponent } from "../member-table/member-table.component";
import { State } from "../app.reducer";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { RemoteData, notAsked, RemoteDataKind } from "../util/remote-data";

const memberTemplate = `
      <div *ngIf="!members.value.length">No members found</div>
      <app-member-table *ngIf="members.value.length" [members]="members.value"></app-member-table>
`;
@Component({
  selector: "app-search-result",
  template: `
  <div [ngSwitch]="members.kind">
    <div *ngSwitchCase="${RemoteDataKind.Loading}">
      <app-loading-indicator></app-loading-indicator></div>
    <div *ngSwitchCase="${RemoteDataKind.Reloading}">
      <app-loading-indicator></app-loading-indicator>
      ${memberTemplate}
    </div>
    <div *ngSwitchCase="${RemoteDataKind.Success}">
      ${memberTemplate}
    </div>
    <div *ngSwitchCase="${RemoteDataKind.ErrorWithData}">
      ${memberTemplate}
      <div class="error">{{members.error}}</div>
    </div>
    <div *ngSwitchCase="${RemoteDataKind.Error}">
      <div class="error">{{members.error}}</div>
    </div>
  </div>
  `,
  styles: []
})
export class SearchResultComponent implements OnInit {
  private observableState: Observable<State>;
  private members: RemoteData<Member[], string> = notAsked();

  constructor(private store: Store<State>) {
    this.observableState = store.pipe(select("appStore"));
    this.observableState.subscribe(state => {
      this.members = state.searchResult;
    });
  }

  ngOnInit() {}
}
