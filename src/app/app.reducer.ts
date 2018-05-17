import { Action } from "@ngrx/store";
import { AppActionsUnion, AppActionType } from "./app.actions";
import { Member } from "./models/member";
import { RemoteData, loading, notAsked } from "./util/remote-data";

export interface State {
  searchResult: RemoteData<Member[], string>;
}

const initialState: State = {
  searchResult: notAsked()
};

export function reducer(state = initialState, action: AppActionsUnion): State {
  switch (action.type) {
    case AppActionType.Search: {
      return { ...state, searchResult: loading() };
    }
    case AppActionType.SearchCompleted: {
      return { ...state, searchResult: action.payload };
    }
  }

  return state;
}
