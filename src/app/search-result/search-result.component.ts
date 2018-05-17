import { Component, OnInit, Input } from "@angular/core";
import { Member } from "../models/member";
import { MemberTableComponent } from "../member-table/member-table.component";
import { State } from "../app.reducer";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-search-result",
  template: `
  <div *ngIf="loading">Loading...</div>
  <div *ngIf="!members.length">No members found</div>
  <app-member-table *ngIf="members.length" [members]="members"></app-member-table>
  `,
  styles: []
})
export class SearchResultComponent implements OnInit {
  private observableState: Observable<State>;
  private members: Member[] = [];
  private loading = false;

  constructor(private store: Store<State>) {
    this.observableState = store.pipe(select("appStore"));
    this.observableState.subscribe(state => {
      this.members = state.searchResult;
      this.loading = state.isSearching;
    });
  }

  ngOnInit() {}
}
