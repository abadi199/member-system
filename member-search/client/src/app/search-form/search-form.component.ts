import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Search } from "../app.actions";
import { MemberService } from "../services/members.service";
import { success } from "../remote-data/remote-data";
import { Store } from "@ngxs/store";

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
  constructor(private store: Store, private memberService: MemberService) {}

  ngOnInit() {}

  search($event) {
    const firstName: string = $event.target.value;

    this._search(firstName);
  }

  _search(firstName: string) {
    if (firstName.length > 1) {
      this.store.dispatch(new Search(firstName));
    }
  }
}
