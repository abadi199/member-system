import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RemoteDataComponent } from "./remote-data.component";

describe("RemoteDataComponent", () => {
  // let component: RemoteDataComponent<String, String>;
  // let fixture: ComponentFixture<RemoteDataComponent<String, String>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoteDataComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(RemoteDataComponent<String, String>);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should create", () => {
    // expect(component).toBeTruthy();
  });
});
