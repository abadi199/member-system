import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Search, SearchCompleted, SearchFailed } from "./app.actions";
import { RemoteDataKind, success } from "./remote-data/remote-data";
import { Member } from "./models/member";
import { AppState, AppStateModel, initialState } from "./app.state";
import { Store, NgxsModule } from "@ngxs/store";
import { of, Observable } from "rxjs";
import { MemberService } from "./services/members.service";
import { cold, hot } from "jasmine-marbles";

describe("State", () => {
  describe("Sync Action", () => {
    const members: Member[] = [{ firstName: "Abadi", lastName: "Kurniawan" }];
    let store: Store;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([AppState])]
      }).compileComponents();
      store = TestBed.get(Store);
    }));

    it("should return loading state given Search Action and empty state", () => {
      store.dispatch(new Search("aba"));
      store
        .selectOnce(state => state.memberSearch)
        .subscribe((newState: AppStateModel) => {
          expect(newState.searchResult.kind).toEqual(RemoteDataKind.Loading);
        });
    });

    it("should return reloading state given Search action and state with existing data", () => {
      store.reset({
        memberSearch: { ...initialState, searchResult: success(members) }
      });
      store.dispatch(new Search("aba"));
      store.selectOnce(state => state.memberSearch).subscribe(newState => {
        expect(newState.searchResult.kind).toEqual(RemoteDataKind.Reloading);
        if (newState.searchResult.kind === RemoteDataKind.Reloading) {
          expect(newState.searchResult.value).toEqual(members);
        }
      });
    });

    it("should return success status with data given SearchCompleted action", () => {
      store.dispatch(new SearchCompleted(members));
      store.selectOnce(state => state.memberSearch).subscribe(newState => {
        expect(newState.searchResult.kind).toEqual(RemoteDataKind.Success);
        if (newState.searchResult.kind === RemoteDataKind.Success) {
          expect(newState.searchResult.value).toEqual(members);
        }
      });
    });

    it("should return fail status given SearchFailed action", () => {
      store.dispatch(new SearchFailed(new Error("Error")));
      store.selectOnce(state => state.memberSearch).subscribe(newState => {
        expect(newState.searchResult.kind).toEqual(RemoteDataKind.Error);
        if (newState.searchResult.kind === RemoteDataKind.Error) {
          expect(newState.searchResult.error).toEqual("Error");
        }
      });
    });
  });

  describe("Side Effect", () => {
    const member = { firstName: "Abadi", lastName: "Kurniawan" };
    let store: Store;

    class TestMemberService {
      constructor() {}

      searchMembers(firstName: string): Observable<Member[]> {
        return of([member]);
      }
    }

    function getMemberService() {
      return new TestMemberService();
    }

    let memberService: TestMemberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([AppState])],
        providers: [{ provide: MemberService, useFactory: getMemberService }]
      });

      memberService = TestBed.get(MemberService);
      store = TestBed.get(Store);
    });

    describe("search$ should dispatch the search completed action", () => {
      it("Should include list of members when successful", () => {
        spyOn(memberService, "searchMembers").and.callThrough();

        const action = new Search("Aba");
        const completion = new SearchCompleted([member]);
        spyOn(store, "dispatch").and.callThrough();
        const actions$ = store.dispatch(action);
        console.log("after dispatch");
        const expected = cold("b", { b: completion });
        expect(actions$).toBeObservable(expected);
      });
      /*
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
*/
    });
  });
});
