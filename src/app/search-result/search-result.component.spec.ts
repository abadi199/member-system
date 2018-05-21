import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchResultComponent } from "./search-result.component";
import { MemberTableComponent } from "../member-table/member-table.component";
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";
import { StoreModule, Store, select } from "@ngrx/store";
import { reducer, State, initialState } from "../app.reducer";
import { Observable, of, BehaviorSubject } from "rxjs";
import { loading, notAsked, success, error } from "../util/remote-data";
import { map } from "rxjs/operators";
import { Member } from "../models/member";

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
    state$.next({ ...initialState, searchResult: success([]) });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain("No members found");
  });
  it("should show loading indicator", () => {
    state$.next({ ...initialState, searchResult: loading() });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain("Loading...");
  });
  it("should show loading indicator and data", () => {
    const member: Member = { firstName: "Abadi", lastName: "Kurniawan" };
    state$.next({
      ...initialState,
      searchResult: loading(success([member]))
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain("Loading...");
    expect(compiled.textContent).toContain(member.firstName);
    expect(compiled.textContent).toContain(member.lastName);
  });
  it("should show data", () => {
    const member: Member = { firstName: "Abadi", lastName: "Kurniawan" };
    state$.next({
      ...initialState,
      searchResult: success([member])
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain(member.firstName);
    expect(compiled.textContent).toContain(member.lastName);
  });
  it("should show error message", () => {
    const errorMessage = "Error searching member";
    state$.next({
      ...initialState,
      searchResult: error(errorMessage)
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain(errorMessage);
  });
  it("should show error message and data", () => {
    const errorMessage = "Error searching member";
    const member: Member = { firstName: "Abadi", lastName: "Kurniawan" };
    state$.next({
      ...initialState,
      searchResult: error(errorMessage, loading(success([member])))
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain(errorMessage);
    expect(compiled.textContent).toContain(member.firstName);
    expect(compiled.textContent).toContain(member.lastName);
  });
});
