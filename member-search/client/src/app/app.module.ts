import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { AppComponent } from "./app.component";
import { SearchFormComponent } from "./search-form/search-form.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { MemberTableComponent } from "./member-table/member-table.component";
import { LoadingIndicatorComponent } from "./loading-indicator/loading-indicator.component";
import { RemoteDataComponent } from "./remote-data/remote-data.component";
import { RemoteDataDirective } from "./remote-data/remote-data.directive";
import { ErrorComponent } from "./error/error.component";
import { AppState } from "./app.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { environment } from "../environments/environment";

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
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production })
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
