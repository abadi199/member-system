import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  Type,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { RemoteData, notAsked, RemoteDataKind } from "@abadi199/remotedata";
import { RemoteDataDirective } from "./remote-data.directive";
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";
import { ErrorComponent } from "../error/error.component";
import { Member } from "../models/member";

@Component({
  selector: "app-remote-data",
  template: `
  <ng-template appRemoteData></ng-template>
  `,
  styles: []
})
export class RemoteDataComponent<T, Error> implements OnInit {
  private _remoteData: RemoteData<T, Error> = notAsked();

  @Input()
  set remoteData(remoteData: RemoteData<T, Error>) {
    this._remoteData = remoteData;
    this.render();
  }
  get remoteData(): RemoteData<T, Error> {
    return this._remoteData;
  }

  @Input() config: Config<T, Error>;
  @ViewChild(RemoteDataDirective) remoteDataDirective: RemoteDataDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}
  render() {
    if (this.config === undefined) {
      return;
    }
    switch (this.remoteData.kind) {
      case RemoteDataKind.Loading:
        this.renderLoading();
        break;
      case RemoteDataKind.Error:
        this.renderError((<Error<Member[], string>>this.remoteData).error);
        break;
      case RemoteDataKind.ErrorWithData:
        this.renderErrorWithData(this.remoteData.value, this.remoteData.error);
        break;
      case RemoteDataKind.NotAsked:
        this.getViewContainerRefAndClear();
        break;
      case RemoteDataKind.Reloading:
        this.renderReloading(this.remoteData.value);
        break;
      case RemoteDataKind.Success:
        this.renderSuccess(this.remoteData.value);
        break;
    }
  }

  getViewContainerRefAndClear(): ViewContainerRef {
    const viewContainerRef = this.remoteDataDirective.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef;
  }

  renderLoading(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.config.loadingComponent
    );
    const componentRef = this.getViewContainerRefAndClear().createComponent(
      componentFactory
    );
  }

  renderSuccess(data: T) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.config.successComponent
    );
    const componentRef = this.getViewContainerRefAndClear().createComponent(
      componentFactory
    );
    (<ISuccessComponent<T>>componentRef.instance).data = data;
  }

  renderReloading(data: T) {
    const loadingComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.config.loadingComponent
    );
    const successComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.config.successComponent
    );
    const containerRef = this.getViewContainerRefAndClear();
    containerRef.createComponent(loadingComponentFactory);
    const componentRef = containerRef.createComponent(successComponentFactory);
    (<ISuccessComponent<T>>componentRef.instance).data = data;
  }

  renderError(error: Error) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.config.errorComponent
    );
    const componentRef = this.getViewContainerRefAndClear().createComponent(
      componentFactory
    );
    (<IErrorComponent<Error>>componentRef.instance).error = error;
  }

  renderErrorWithData(data: T, error: Error) {
    const errorComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.config.errorComponent
    );
    const containerRef = this.getViewContainerRefAndClear();
    const errorComponentRef = containerRef.createComponent(
      errorComponentFactory
    );
    (<IErrorComponent<Error>>errorComponentRef.instance).error = error;

    const successComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.config.successComponent
    );
    const componentRef = containerRef.createComponent(successComponentFactory);
    (<ISuccessComponent<T>>componentRef.instance).data = data;
  }
}

export interface Config<T, Error> {
  // tslint:disable-next-line:no-any
  loadingComponent: Type<any>;
  successComponent: Type<ISuccessComponent<T>>;
  errorComponent: Type<IErrorComponent<Error>>;
}

export interface ISuccessComponent<T> {
  data: T;
}

export interface IErrorComponent<Error> {
  error: Error;
}

export function config<T>(
  successComponent: Type<ISuccessComponent<T>>
): Config<T, string> {
  return {
    loadingComponent: LoadingIndicatorComponent,
    errorComponent: ErrorComponent,
    successComponent
  };
}
