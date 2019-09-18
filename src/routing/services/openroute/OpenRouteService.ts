import { Point } from "../../../business/pathfinder/point/Point";
import token from "../../../creds/token.json";
import HttpHelper from "../utils/HttpHelper";

import * as openrouteservice from "openrouteservice-js";

export class OpenRouteService {
    public readonly apikey = token["api-key"];

    public async getDirections(start: Point, end: Point): Promise<any> {
        const Directions = new openrouteservice.Directions({
            api_key: this.apikey
        });

        return new Promise((resolve, reject) => {
            Directions.calculate({
                coordinates: [[start.Latitude, start.Longitude], [end.Latitude, end.Longitude]],
                format: "json"
            })
            .then((json) => {
                resolve(json);
            })
            .catch((err) => {
                const str = `An error has occurred: ${err}`;
                reject(str);
            });
        });
    }

    public async getTimeMatrix(points: Point[]): Promise<any> {
        const Matrix = new openrouteservice.Matrix({
            api_key: this.apikey
        });

        const locs = [[9.70093, 48.477473], [9.207916, 49.153868], [37.573242, 55.801281], [115.663757, 38.106467]];

        return new Promise((resolve, reject) => {
            Matrix.calculate({
                // locations: points.map((point) => [point.Latitude, point.Longitude]),
                locations: locs
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                console.log(err);
                const str = `An error has occurred: ${err}`;
                reject(str);
            });
        });
    }
}
export default OpenRouteService;
