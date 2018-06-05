import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchFormComponent } from "./search-form.component";
import { AppActionsUnion, Search } from "../app.actions";
import { Component } from "@angular/core";
import { Store, NgxsModule } from "@ngxs/store";
import { AppState } from "../app.state";

describe("SearchFormComponent", () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [NgxsModule.forRoot([AppState])]
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

  describe("_search()", () => {
    it("Should dispatch the search action with valid input", () => {
      const firstName = "Aba";

      const action = new Search(firstName);

      component._search(firstName);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it("Should not dispatch search action with invalid input", () => {
      const shortFirstName = "A";

      const action = new Search(shortFirstName);

      component._search(shortFirstName);

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe("search", () => {
    it("Should submit search on input keypress enter", async () => {
      const keyName = "Enter";
      const eventName = "keyup";
      const firstName = "Aba";

      spyOn(component, "search").and.callThrough();

      const input = fixture.debugElement.nativeElement.querySelector("input");
      input.value = firstName;

      input.dispatchEvent(new KeyboardEvent(eventName, { key: keyName }));

      fixture.whenStable().then(() => {
        expect(component.search).toHaveBeenCalled();
      });
    });
  });
});
