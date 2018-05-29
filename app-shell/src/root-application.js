import * as singleSpa from "single-spa";

singleSpa.registerApplication(
  "member-search",
  () => SystemJS.import("http://localhost:4200/"),
  pathPrefix("/member-search")
);
singleSpa.start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  };
}
