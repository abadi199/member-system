import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchFormComponent } from "./search-form.component";
import { StoreModule } from "@ngrx/store";
import { reducer } from "../app.reducer";

describe("SearchFormComponent", () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [StoreModule.forRoot({ appStore: reducer })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
