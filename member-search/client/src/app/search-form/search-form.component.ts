import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State } from "../app.reducer";
import { Observable } from "rxjs";
import { Search } from "../app.actions";
import { MemberService } from "../services/members.service";
import { success } from "@abadi199/remotedata";

@Component({
  selector: "app-search-form",
  template: `
    <div>
      <input id="search-input" placeholder="Search" (keyup.enter)="search($event)">
    </div>
  `,
  styles: []
})
export class SearchFormComponent implements OnInit {
  constructor(
    private store: Store<State>,
    private memberService: MemberService
  ) {}

  ngOnInit() {}

  search($event) {
    var firstName: string = $event.target.value;

    this._search(firstName);
  }

  _search(firstName: string) {
    if (firstName.length > 1) {
      this.store.dispatch(new Search(firstName));
    }
  }
}
