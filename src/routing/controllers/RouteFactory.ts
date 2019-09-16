import Middleware from "../../business/templates/Middleware";
import Route from "../../business/templates/Route";
import Authorization from "../middlewares/Authorization";

export class RouteFactory {
    public createRoute(httpMethod: string, path: string, func: any) {
        const route = new Route(httpMethod, "/" + path.replace("/", ""), func);
        route.setMiddlewares([new Authorization()]);
        return route;
    }

    public createRouteWithMiddlewares(httpMethod: string, path: string, middlewares: Middleware[], func: any) {
        const route = new Route(httpMethod, "/" + path.replace("/", ""), func);
        middlewares.push(new Authorization());
        route.setMiddlewares(middlewares);
        return route;
    }

    public createAnonymousRoute(httpMethod: string, path: string, func: any) {
        return new Route(httpMethod, "/" + path.replace("/", ""), func);
    }

    public createAnonymousRouteWithMiddlewares(httpMethod: string, path: string, middlewares: Middleware[], func: any) {
        const route = new Route(httpMethod, "/" + path.replace("/", ""), func);
        route.setMiddlewares(middlewares);
        return route;
    }
}

export default RouteFactory;
