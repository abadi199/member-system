import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchResultComponent } from "./search-result.component";
import { MemberTableComponent } from "../member-table/member-table.component";
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";
import { StoreModule } from "@ngrx/store";
import { reducer } from "../app.reducer";

describe("SearchResultComponent", () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchResultComponent,
        MemberTableComponent,
        LoadingIndicatorComponent
      ],
      imports: [StoreModule.forRoot({ appStore: reducer })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
