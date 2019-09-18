import * as express from "express";

import Controller from "../../../business/templates/Controller";

import RouteFactory from "../RouteFactory";

import Pathfinder from "../../../business/pathfinder/Pathfinder";
import Point from "../../../business/pathfinder/point/Point";
import PointFactory from "../../../business/pathfinder/point/PointFactory";
import Route from "../../../business/templates/Route";
import OpenRouteService from "../../../routing/services/openroute/OpenRouteService";

export class Pathing extends Controller {
    public path: string = "path";
    public router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public readonly pathfinder = new Pathfinder();
    public readonly pointFactory = new (PointFactory)();
    public readonly openRoute = new OpenRouteService();

    public getRoute = this.routeFactory.createRoute("POST", "route",
    async (request: express.Request, response: express.Response) => {
        try {
            const points = this.pointFactory.pointsFromArray(request.body.points);
            if (points.length === 2) {
                // response.send(this.pathfinder.getPathBetweenPoints(points));
                this.openRoute.getDirections(points[0], points[1]).then((body) => {
                    response.send(body);
                }).catch((err) => {
                    response.send(err);
                });
            } else if (points.length === 0) {
                throw Error("No points were given.");
            } else {
                throw Error("Unknown error.");
            }
        } catch (e) {
            response.send(e);
        }
    });

    public getMatrix = this.routeFactory.createRoute("POST", "matrix",
    async (request: express.Request, response: express.Response) => {
        try {
            const points = this.pointFactory.pointsFromArray(request.body.points);
            if (points.length > 0) {
                // response.send(this.pathfinder.getPathBetweenPoints(points));
                this.openRoute.getTimeMatrix(points).then((body) => {
                    response.send(body);
                }).catch((err) => {
                    response.send(err);
                });
            } else if (points.length === 0) {
                throw Error("No points were given.");
            } else {
                throw Error("Unknown error.");
            }
        } catch (e) {
            response.send(e);
        }
    });

    public routes: Route[] = [
        this.getRoute, this.getMatrix
    ];
}
export default Pathing;
