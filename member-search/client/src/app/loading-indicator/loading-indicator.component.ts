import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loading-indicator",
  template: `
    <p>
      Loading...
    </p>
  `,
  styles: []
})
export class LoadingIndicatorComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
