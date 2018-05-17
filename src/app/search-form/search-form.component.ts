import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State } from "../app.reducer";
import { Observable } from "rxjs";
import { AppActionType } from "../app.actions";
import { MemberService } from "../services/members.service";

// TODO what does the async option mean??
@Component({
  selector: "app-search-form",
  template: `
    <div>
      <input placeholder="Search" (keyup.enter)="search($event)">
      <div *ngIf="isSearching" class="loader">
      </div>
      <p>{{ isSearching ? "Searching" : "Not Searching" }}</p>
    </div>
  `,
  styles: [
    `
    .loader {
      border: 16px solid #f3f3f3; /* Light grey */
      border-top: 16px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 2s linear infinite;
  }

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
    `
  ]
})
export class SearchFormComponent implements OnInit {
  private observableState: Observable<State>;
  private isSearching = false;

  constructor(
    private store: Store<State>,
    private memberService: MemberService
  ) {
    this.observableState = store.pipe(select("appStore"));
    this.observableState.subscribe(state => {
      this.isSearching = state.isSearching;
    });
  }

  ngOnInit() {}

  search($event) {
    this.store.dispatch({ type: AppActionType.Search });
    this.memberService.searchMembers($event.target.value).subscribe(result => {
      this.store.dispatch({
        type: AppActionType.SearchCompleted,
        payload: result
      });
    });
  }
}
