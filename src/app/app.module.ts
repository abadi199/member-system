import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { SearchFormComponent } from "./search-form/search-form.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { reducer } from "./app.reducer";
import { MemberTableComponent } from "./member-table/member-table.component";

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultComponent,
    MemberTableComponent
  ],
  imports: [BrowserModule, StoreModule.forRoot({ appStore: reducer })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
