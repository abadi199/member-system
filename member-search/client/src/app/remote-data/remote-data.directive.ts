import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appRemoteData]"
})
export class RemoteDataDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
