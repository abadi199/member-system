import { State, Action, StateContext, Selector } from "@ngxs/store";
import {
  RemoteData,
  notAsked,
  loading,
  error,
  success
} from "./remote-data/remote-data";
import { Member } from "./models/member";
import { Search, SearchCompleted, SearchFailed } from "./app.actions";
import { MemberService } from "./services/members.service";
import { catchError, tap } from "rxjs/operators";
import { empty } from "rxjs";

// State Model
export const initialState: AppStateModel = {
  searchResult: notAsked()
};

export interface AppStateModel {
  searchResult: RemoteData<Member[], string>;
}

// State
@State<AppStateModel>({
  name: "memberSearch",
  defaults: initialState
})
export class AppState {
  @Selector()
  static searchResult(state: AppStateModel): RemoteData<Member[], string> {
    return state.searchResult;
  }

  @Action(Search)
  startSearch(
    { getState, setState }: StateContext<AppStateModel>,
    action: Search
  ) {
    const state = getState();
    setState({ ...state, searchResult: loading(state.searchResult) });
  }

  @Action(SearchCompleted)
  searchCompleted(
    { getState, setState }: StateContext<AppStateModel>,
    action: SearchCompleted
  ) {
    const state = getState();
    setState({ ...state, searchResult: success(action.payload) });
  }

  @Action(SearchFailed)
  searchFailed(
    { getState, setState }: StateContext<AppStateModel>,
    action: SearchFailed
  ) {
    const state = getState();
    setState({
      ...state,
      searchResult: error(action.payload.message, state.searchResult)
    });
  }

  @Action(Search)
  search({ dispatch }: StateContext<AppStateModel>, action: Search) {
    console.log("search");
    return this.memberService.searchMembers(action.payload).pipe(
      tap(result => {
        console.log("search completed");
        dispatch(new SearchCompleted(result));
      }),
      catchError((err: Error) => {
        console.log("search failed");
        dispatch(new SearchFailed(err));
        return empty();
      })
    );
  }

  constructor(private memberService: MemberService) {}
}
