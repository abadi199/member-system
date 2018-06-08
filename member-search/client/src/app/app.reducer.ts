import { AppActionsUnion, AppActionType } from "./app.actions";
import { Member } from "./models/member";
import {
  RemoteData,
  notAsked,
  loading,
  update
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
      return { ...state, searchResult: update(state.searchResult, action.payload) };
    }
 }

  return state;
}
