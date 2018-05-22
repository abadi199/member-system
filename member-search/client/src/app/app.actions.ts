import { Action } from "@ngrx/store";
import { Member } from "./models/member";
import { RemoteData } from "./util/remote-data";

export enum AppActionType {
  Search = "[App] Search",
  SearchCompleted = "[App] Search Completed"
}

export class Search implements Action {
  readonly type = AppActionType.Search;

  constructor(public payload: string) {}
}

export class SearchCompleted implements Action {
  readonly type = AppActionType.SearchCompleted;

  constructor(public payload: RemoteData<Member[], string>) {}
}

export type AppActionsUnion = Search | SearchCompleted;
