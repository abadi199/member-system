import { Action } from "@ngrx/store";
import { AppActionsUnion, AppActionType } from "./app.actions";
import { Member } from "./models/member";
import {
  RemoteData,
  notAsked,
  error,
  loading
} from "@abadi199/remotedata";

export interface State {
  searchResult: RemoteData<Member[], string>;
}

export const initialState: State = {
  searchResult: notAsked()
};

export function reducer(state = initialState, action: AppActionsUnion): State {
  switch (action.type) {
    case AppActionType.Search: {
      return { ...state, searchResult: loading(state.searchResult) };
    }
    case AppActionType.SearchCompleted: {
      return { ...state, searchResult: action.payload };
    }
    case AppActionType.SearchFailed: {
      return {
        ...state,
        searchResult: error(action.payload.message, state.searchResult)
      };
    }
  }

  return state;
}
