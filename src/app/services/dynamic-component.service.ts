import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  Type,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  // Create and attach a component to the DOM
  createComponent<T>(component: Type<T>): ComponentRef<T> {
    // Create the component
    const componentRef = createComponent(component, {
      environmentInjector: this.injector,
    });

    // Attach to the view
    this.appRef.attachView(componentRef.hostView);

    // Add to the DOM
    const domElement = (componentRef.hostView as any).rootNodes[0];
    document.body.appendChild(domElement);

    return componentRef;
  }

  // Remove a component from the DOM
  removeComponent(componentRef: ComponentRef<any>): void {
    const element = (componentRef.hostView as any).rootNodes[0];
    element.parentNode?.removeChild(element);
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
