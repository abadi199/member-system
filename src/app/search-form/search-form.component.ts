import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State } from "../app.reducer";
import { Observable } from "rxjs";
import { AppActionType } from "../app.actions";
import { MemberService } from "../services/members.service";
import { success } from "../util/remote-data";
@Component({
  selector: "app-search-form",
  template: `
    <div>
      <input placeholder="Search" (keyup.enter)="search($event)">
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
    this.store.dispatch({ type: AppActionType.Search });
    this.memberService.searchMembers($event.target.value).subscribe(result => {
      this.store.dispatch({
        type: AppActionType.SearchCompleted,
        payload: success(result)
      });
    });
  }
}
