import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from "./app.component";
import { SearchFormComponent } from "./search-form/search-form.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { reducer } from "./app.reducer";
import { MemberTableComponent } from "./member-table/member-table.component";
import { LoadingIndicatorComponent } from "./loading-indicator/loading-indicator.component";
import { AppEffects } from "./app.effects";
import { RemoteDataComponent } from "./remote-data/remote-data.component";
import { RemoteDataDirective } from "./remote-data/remote-data.directive";
import { ErrorComponent } from "./error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultComponent,
    MemberTableComponent,
    LoadingIndicatorComponent,
    RemoteDataComponent,
    RemoteDataDirective,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ appStore: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  entryComponents: [
    LoadingIndicatorComponent,
    MemberTableComponent,
    ErrorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
