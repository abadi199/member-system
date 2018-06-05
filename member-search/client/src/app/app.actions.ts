import { Member } from "./models/member";
import { RemoteData } from "./remote-data/remote-data";

export enum AppActionType {
  Search = "[App] Search",
  SearchCompleted = "[App] Search Completed",
  SearchFailed = "[App] Search Failed"
}

export class Search {
  static readonly type = AppActionType.Search;

  constructor(public payload: string) {}
}

export class SearchCompleted {
  static readonly type = AppActionType.SearchCompleted;

  constructor(public payload: Member[]) {}
}

export class SearchFailed {
  static readonly type = AppActionType.SearchFailed;

  constructor(public payload: Error) {}
}

export type AppActionsUnion = Search | SearchCompleted | SearchFailed;
