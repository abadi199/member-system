import { Component, OnInit, Input } from "@angular/core";
import { Member } from "../models/member";
import { MemberTableComponent } from "../member-table/member-table.component";
import { State } from "../app.reducer";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { RemoteData, notAsked, RemoteDataKind } from "../util/remote-data";

@Component({
  selector: "app-search-result",
  template: `
  <div [ngSwitch]="members.kind">
    <div *ngSwitchCase="'${RemoteDataKind.Loading}'">Loading...</div>
    <div *ngSwitchCase="'${RemoteDataKind.Success}'">
      <div *ngIf="!members.value.length">No members found</div>
      <app-member-table *ngIf="members.value.length" [members]="members.value"></app-member-table>
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
