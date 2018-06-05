/*import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { empty, Observable, of, ReplaySubject, throwError } from "rxjs";
import {
  AppActionType,
  Search,
  SearchCompleted,
  SearchFailed
} from "./app.actions";
import { MemberService } from "./services/members.service";
import { AppEffects } from "./app.effects";
import { Member } from "./models/member";
import { cold, hot } from "jasmine-marbles";
import { success, error } from "./remote-data/remote-data";
import { provideMockActions } from "@ngrx/effects/testing";
import { delay } from "rxjs/operators";

const member = { firstName: "Abadi", lastName: "Kurniawan" };

class TestMemberService {
  constructor() {}

  searchMembers(firstName: string): Observable<Member[]> {
    return of([member]);
  }
}

function getMemberService() {
  return new TestMemberService();
}

describe("AppEffects", () => {
  let effects: AppEffects;
  let memberService: TestMemberService;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => {
          return actions;
        }),
        { provide: MemberService, useFactory: getMemberService },
        AppEffects
      ]
    });

    effects = TestBed.get(AppEffects);
    memberService = TestBed.get(MemberService);
  });

  describe("search$ should dispatch the search completed action", () => {
    it("Should include list of members when successful", () => {
      spyOn(memberService, "searchMembers").and.callThrough();

      const action = new Search("Aba");
      const completion = new SearchCompleted(success([member]));

      actions = hot("a", { a: action });
      const expected = cold("b", { b: completion });
      expect(effects.search$).toBeObservable(expected);
    });

    it("Should include an error message when failing", () => {
      spyOn(memberService, "searchMembers").and.returnValue(
        throwError(new Error("API Error"))
      );
      const action = new Search("Aba");
      const completion = new SearchFailed(new Error("API Error"));

      actions = hot("a", { a: action });
      const expected = cold("b", { a: action, b: completion });

      expect(effects.search$).toBeObservable(expected);
    });
  });
});
*/
