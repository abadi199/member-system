import * as singleSpa from "../lib/single-spa";
import { loader, router } from "single-spa-angular-cli";
import "zone.js";

singleSpa.registerApplication(
  "member-search",
  (() => {
    const lifecycles = loader({
      name: "member-search",
      selector: "app-root",
      baseHref: "http://localhost:4200"
    });
    return {
      bootstrap: [lifecycles.bootstrap],
      mount: [lifecycles.mount],
      unmount: [lifecycles.unmount],
      unload: [lifecycles.unload]
    };
  })(),
  router.matchRoute("/", true)
);
singleSpa.start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  };
}
