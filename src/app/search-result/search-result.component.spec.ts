import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchResultComponent } from "./search-result.component";
import { MemberTableComponent } from "../member-table/member-table.component";
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";
import { StoreModule, Store, select } from "@ngrx/store";
import { reducer, State, initialState } from "../app.reducer";
import { Observable, of, BehaviorSubject } from "rxjs";
import { loading, notAsked, success } from "../util/remote-data";
import { map } from "rxjs/operators";

describe("SearchResultComponent", () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let store: Store<State>;
  const state$ = new BehaviorSubject(initialState);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // providers: [{ provide: Store, useClass: MockStore }],
      declarations: [
        SearchResultComponent,
        MemberTableComponent,
        LoadingIndicatorComponent
      ],
      imports: [StoreModule.forRoot({ appStore: reducer })]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, "pipe").and.returnValue(state$);

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  const setupComponent = () => {};

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should show no members found", () => {
    const state: State = { ...initialState, searchResult: success([]) };
    state$.next(state);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("div").textContent).toContain(
      "No members found"
    );
  });
  it("should show loading indicator", () => {
    const state: State = { ...initialState, searchResult: loading() };
    state$.next(state);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p").textContent).toContain("Loading...");
  });
});
