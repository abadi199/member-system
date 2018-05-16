import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from "../app.reducer";
import { Observable } from 'rxjs'
import { AppActionType } from '../app.actions';
import { MemberService } from '../services/member.service';


//TODO what does the async option mean??
@Component({
  selector: 'search-form',
  template: `
    <div>
      <input placeholder="Search" (keyup.enter)="search($event)">
      <p>{{ (searchingState | async)['isSearching'] ? "Searching" : "Not Searching" }}</p>
    </div>
  `,
  styles: []
})
export class SearchFormComponent implements OnInit {
  private searchingState: Observable<State>;

  constructor(private store: Store<State>, private memberService: MemberService) { 
    this.searchingState = store.pipe(select('appStore'));
  }

  ngOnInit() {
  }

  search($event){
    this.store.dispatch({ type: AppActionType.Search});
    this.memberService.searchMembers($event.target.value).subscribe(result => {
      this.store.dispatch({ type: AppActionType.SearchCompleted, payload: result})
    })
  }

}
