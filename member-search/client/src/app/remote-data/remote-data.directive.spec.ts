// tslint:disable:no-any
import { RemoteDataDirective } from "./remote-data.directive";
import {
  ViewContainerRef,
  ElementRef,
  Injector,
  ViewRef,
  TemplateRef,
  EmbeddedViewRef,
  ComponentFactory,
  NgModuleRef,
  ComponentRef
} from "@angular/core";

class MockViewContainerRef extends ViewContainerRef {
  element: ElementRef<any>;
  injector: Injector;
  parentInjector: Injector;
  length: number;
  clear(): void {
    throw new Error("Method not implemented.");
  }
  get(index: number): ViewRef | null {
    throw new Error("Method not implemented.");
  }
  createEmbeddedView<C>(
    templateRef: TemplateRef<C>,
    context?: C | undefined,
    index?: number | undefined
  ): EmbeddedViewRef<C> {
    throw new Error("Method not implemented.");
  }
  createComponent<C>(
    componentFactory: ComponentFactory<C>,
    index?: number | undefined,
    injector?: Injector | undefined,
    projectableNodes?: any[][] | undefined,
    ngModule?: NgModuleRef<any> | undefined
  ): ComponentRef<C> {
    throw new Error("Method not implemented.");
  }
  insert(viewRef: ViewRef, index?: number | undefined): ViewRef {
    throw new Error("Method not implemented.");
  }
  move(viewRef: ViewRef, currentIndex: number): ViewRef {
    throw new Error("Method not implemented.");
  }
  indexOf(viewRef: ViewRef): number {
    throw new Error("Method not implemented.");
  }
  remove(index?: number | undefined): void {
    throw new Error("Method not implemented.");
  }
  detach(index?: number | undefined): ViewRef | null {
    throw new Error("Method not implemented.");
  }
}

describe("RemoteDataDirective", () => {
  it("should create an instance", () => {
    const directive = new RemoteDataDirective(new MockViewContainerRef());
    expect(directive).toBeTruthy();
  });
});
