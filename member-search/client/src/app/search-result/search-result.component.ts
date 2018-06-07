import { Component, OnInit, Input } from "@angular/core";
import { Member } from "../models/member";
import { MemberTableComponent } from "../member-table/member-table.component";
import { State } from "../app.reducer";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  RemoteData,
  notAsked,
  RemoteDataKind
} from "@abadi199/remotedata";
import * as RemoteDataComponent from "../remote-data/remote-data.component";
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";
import { ErrorComponent } from "../error/error.component";

@Component({
  selector: "app-search-result",
  template: `
  <app-remote-data [remoteData]="members" [config]="config"></app-remote-data>
 `,
  styles: []
})
export class SearchResultComponent implements OnInit {
  members: RemoteData<Member[], string> = notAsked();
  config = RemoteDataComponent.config(MemberTableComponent);

  constructor(private store: Store<State>) {
    store.pipe(select("appStore")).subscribe(state => {
      this.members = state.searchResult;
    });
  }

  ngOnInit() {}
}
