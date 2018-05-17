import { Action } from "@ngrx/store";
import { Member } from "./models/member";
import { AppActionsUnion, AppActionType } from "./app.actions";

export interface State {
  isSearching: boolean;
  searchResult: Member[];
}

const initialState: State = {
  isSearching: false,
  searchResult: []
};

export function reducer(state = initialState, action: AppActionsUnion): State {
  switch (action.type) {
    case AppActionType.Search: {
      return { ...state, isSearching: true };
    }
    case AppActionType.SearchCompleted: {
      return { isSearching: false, searchResult: action.payload };
    }
  }

  return state;
}
