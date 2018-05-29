import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { platformSingleSpa } from "single-spa-angular-cli";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformSingleSpa
  .mount("member-search")
  .subscribe(({ props, attachUnmount }) => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .then(module => {
        attachUnmount(module);
      })
      .catch(err => console.log(err));
  });
