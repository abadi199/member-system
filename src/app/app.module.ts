import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { SearchFormComponent } from "./search-form/search-form.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { reducer } from "./app.reducer";

@NgModule({
  declarations: [AppComponent, SearchFormComponent, SearchResultComponent],
  imports: [BrowserModule, StoreModule.forRoot({ appStore: reducer })],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule {}
