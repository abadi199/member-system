import { Action, ActionReducer } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import {
  AppActionType,
  AppActionsUnion,
  Search,
  SearchCompleted
} from "./app.actions";
import { MemberService } from "./services/members.service";
import { map, mergeMap } from "rxjs/operators";
import { success } from "./util/remote-data";

@Injectable()
export class AppEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(AppActionType.Search),
    mergeMap(action =>
      this.memberService
        .searchMembers(action.payload)
        .pipe(map(result => new SearchCompleted(success(result))))
    )
  );

  constructor(
    private actions$: Actions,
    private memberService: MemberService
  ) {}
}
