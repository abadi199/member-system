import { Component } from '@angular/core';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultComponent } from './search-result/search-result.component';

@Component({
  selector: 'app-root',
  template:
  `<h1>{{title}}</h1>
  <app-search-form></app-search-form>
  <search-result></search-result>
  `
})
export class AppComponent {
  title = 'Member Search';
}
