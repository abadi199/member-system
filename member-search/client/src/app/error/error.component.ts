import { Component, OnInit } from "@angular/core";
import { IErrorComponent } from "../remote-data/remote-data.component";

@Component({
  selector: "app-error",
  template: `
    <p>
      {{error}}
    </p>
  `,
  styles: []
})
export class ErrorComponent implements OnInit, IErrorComponent<string> {
  error: string;

  constructor() {}

  ngOnInit() {}
}
