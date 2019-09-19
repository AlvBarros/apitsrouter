import Point from "../../../business/pathfinder/point/Point";
import PointFactory from "../../../business/pathfinder/point/PointFactory";

import Path from "../../../business/pathfinder/path/Path";
import PathFactory from "../../../business/pathfinder/path/PathFactory";

import Matrix from "../../../business/pathfinder/matrix/Matrix";
import MatrixFactory from "../../../business/pathfinder/matrix/MatrixFactory";

import token from "../../../creds/token.json";
import HttpHelper from "../utils/HttpHelper";

import * as openrouteservice from "openrouteservice-js";

// MOCK
import * as response from "./example-matrix-response.json";

export class OpenRouteService {
    public readonly apikey = token["api-key"];
    public readonly pointFactory = new PointFactory();
    public readonly pathFactory = new PathFactory();
    public readonly matrixFactory = new MatrixFactory();

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

    public async getTimeMatrix(query: Point[]): Promise<any> {
        /* MOCK */
        return new Promise((resolve, reject) => {
            const durations = response.durations;
            const points = this.pointFactory.pointsFromNumbersArray(response.metadata.query.locations);
            const paths = this.pathFactory.pathsFromPointsAndDurations(points, durations);
            const matrix = this.matrixFactory.matrixFromPathsAndPointsArray(points, paths);
            resolve(matrix);
        });
        /***********/
        const Matrix = new openrouteservice.Matrix({
            api_key: this.apikey
        });
        return new Promise((resolve, reject) => {
            Matrix.calculate({
                locations: query.map((point) => [point.Latitude, point.Longitude])
            })
            .then((x) => {
                resolve(x);
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
