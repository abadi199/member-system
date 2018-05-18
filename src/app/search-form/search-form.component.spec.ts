import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchFormComponent } from "./search-form.component";
import { StoreModule, Store } from "@ngrx/store";
import { reducer, State } from "../app.reducer";
import { AppActionsUnion, Search } from "../app.actions";
import { Component } from "@angular/core";

describe("SearchFormComponent", () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [StoreModule.forRoot({ appStore: reducer })]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    spyOn(store, "dispatch").and.callThrough();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch the search action when _search is called with valid input", () => {
    const firstName: string = "Aba";

    const action = new Search(firstName);

    component._search(firstName);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it("should not dispatch the search action when _search is called with invalid input", () => {
    const shortFirstName: string = "A";

    const action = new Search(shortFirstName);

    component._search(shortFirstName);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it("Should call the search method when input is submitted with enter", async () => {
    const keyName: string = "Enter";
    const eventName: string = "keyup";
    const firstName: string = "Aba";

    spyOn(component, "search");

    var input = fixture.debugElement.nativeElement.querySelector("input");
    input.value = firstName;

    input.dispatchEvent(new KeyboardEvent(eventName, { key: keyName }));

    fixture.whenStable().then(() => {
      expect(component.search).toHaveBeenCalled();
    });
  });
});
