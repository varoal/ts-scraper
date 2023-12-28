import { Route, Router } from '@vaadin/router';

export class Routing {
  private _routes: Route;

  constructor(routes: Route) {
    this._routes = routes;
  }

  public get routes() {
    return this._routes;
  }

  public init(routerOutlet: Element | null): void {
    const router = new Router(routerOutlet);
    router.setRoutes(this.routes);
  }
}
