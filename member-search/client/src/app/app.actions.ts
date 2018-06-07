import { Action } from "@ngrx/store";
import { Member } from "./models/member";
import { RemoteData } from "@abadi199/remotedata";

export enum AppActionType {
  Search = "[App] Search",
  SearchCompleted = "[App] Search Completed",
  SearchFailed = "[App] Search Failed"
}

export class Search implements Action {
  readonly type = AppActionType.Search;

  constructor(public payload: string) {}
}

export class SearchCompleted implements Action {
  readonly type = AppActionType.SearchCompleted;

  constructor(public payload: RemoteData<Member[], string>) {}
}

export class SearchFailed implements Action {
  readonly type = AppActionType.SearchFailed;

  constructor(public payload: Error) {}
}

export type AppActionsUnion = Search | SearchCompleted | SearchFailed;
