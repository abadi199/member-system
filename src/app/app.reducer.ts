import { Action } from "@ngrx/store";
import { AppActionsUnion, AppActionType } from "./app.actions";
import { Member } from "./models/member";
import { RemoteData, notAsked, error, loading } from "./util/remote-data";

export interface State {
  searchResult: RemoteData<Member[], string>;
}

const initialState: State = {
  searchResult: notAsked()
};

export function reducer(state = initialState, action: AppActionsUnion): State {
  console.log("Hit here in the reducer");
  console.log(action);
  switch (action.type) {
    case AppActionType.Search: {
      return { ...state, searchResult: loading(state.searchResult) };
    }
    case AppActionType.SearchCompleted: {
      return { ...state, searchResult: action.payload };
    }
  }

  return state;
}
