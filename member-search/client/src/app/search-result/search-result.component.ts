import { Component, OnInit, Input } from "@angular/core";
import { Member } from "../models/member";
import { MemberTableComponent } from "../member-table/member-table.component";
import { Observable } from "rxjs";
import {
  RemoteData,
  notAsked,
  RemoteDataKind
} from "../remote-data/remote-data";
import * as RemoteDataComponent from "../remote-data/remote-data.component";
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";
import { ErrorComponent } from "../error/error.component";
import { Store, Select } from "@ngxs/store";
import { AppState } from "../app.state";

@Component({
  selector: "app-search-result",
  template: `
  <app-remote-data [remoteData]="members$ | async" [config]="config"></app-remote-data>
 `,
  styles: []
})
export class SearchResultComponent implements OnInit {
  @Select(AppState.searchResult)
  members$: Observable<RemoteData<Member[], string>>;

  config = RemoteDataComponent.config(MemberTableComponent);

  constructor(private store: Store) {}

  ngOnInit() {}
}
