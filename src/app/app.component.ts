import { Component } from "@angular/core";
import { SearchFormComponent } from "./search-form/search-form.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { Member } from "./models/member";

@Component({
  selector: "app-root",
  template: `<h1>{{title}}</h1>
  <search-form></search-form>
  <app-search-result></app-search-result>
  `
})
export class AppComponent {
  title = "Member Search";
}
