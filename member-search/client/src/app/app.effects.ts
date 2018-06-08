import { Action, ActionReducer } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, of, Subscription, empty } from "rxjs";
import {
  AppActionType,
  AppActionsUnion,
  Search,
  SearchCompleted
} from "./app.actions";
import { MemberService } from "./services/members.service";
import { map, mergeMap, catchError } from "rxjs/operators";
import { success, error } from "@abadi199/remotedata";

const searchErrorMessage =
  "An error occurred fetching results from the member service";

@Injectable()
export class AppEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(AppActionType.Search),
    mergeMap(action => {
      return this.memberService.searchMembers(action.payload).pipe(
        map(result => new SearchCompleted(success(result))),
        catchError((err: Error) => {
          return of(new SearchCompleted(error(err.message)));
        })
      );
    }),
    catchError((err: Error) => {
      return of(new SearchCompleted(error(err.message)));
    })
  );

  constructor(
    private actions$: Actions,
    private memberService: MemberService
  ) {}
}
