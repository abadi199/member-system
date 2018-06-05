import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchResultComponent } from "./search-result.component";
import { MemberTableComponent } from "../member-table/member-table.component";
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";
import { Observable, of, BehaviorSubject } from "rxjs";
import { loading, notAsked, success, error } from "../remote-data/remote-data";
import { map } from "rxjs/operators";
import { Member } from "../models/member";
import { RemoteDataComponent } from "../remote-data/remote-data.component";
import { ErrorComponent } from "../error/error.component";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { RemoteDataDirective } from "../remote-data/remote-data.directive";
import { NgxsModule, Store } from "@ngxs/store";
import { initialState, AppState } from "../app.state";
/*
describe("SearchResultComponent", () => {
  let component: SearchResultComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<SearchResultComponent>;
  let store: Store;
  const state$ = new BehaviorSubject(initialState);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchResultComponent,
        MemberTableComponent,
        LoadingIndicatorComponent,
        RemoteDataComponent,
        ErrorComponent,
        RemoteDataDirective
      ],
      imports: [NgxsModule.forRoot([AppState])]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [
            LoadingIndicatorComponent,
            MemberTableComponent,
            ErrorComponent
          ]
        }
      })
      .compileComponents();

    store = TestBed.get(Store);
    spyOn(store, "pipe").and.returnValue(state$);

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  const setupComponent = () => {};

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should show no members found", () => {
    state$.next({ ...initialState, searchResult: success([]) });
    fixture.detectChanges();
    expect(compiled.textContent).toContain("No members found");
  });
  it("should show loading indicator", () => {
    state$.next({ ...initialState, searchResult: loading() });
    fixture.detectChanges();
    expect(compiled.querySelector("app-loading-indicator")).not.toBeNull();
  });
  it("should show loading indicator and data", () => {
    const member: Member = { firstName: "Abadi", lastName: "Kurniawan" };
    state$.next({
      ...initialState,
      searchResult: loading(success([member]))
    });
    fixture.detectChanges();
    expect(compiled.querySelector("app-loading-indicator")).not.toBeNull();
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
    expect(compiled.textContent).toContain(errorMessage);
    expect(compiled.textContent).toContain(member.firstName);
    expect(compiled.textContent).toContain(member.lastName);
  });
});
*/
