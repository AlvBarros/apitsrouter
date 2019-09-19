import Dijkstra from "./Dijkstra";
import Path from "./path/Path";
import Point from "./point/Point";
import Matrix from "./matrix/Matrix";
import Rule from "./rules/Rule";

export class Pathfinder {
    public readonly dijkstra = new Dijkstra();

    public getBestRouteFromMatrix(matrix: Matrix, start: Point, end: Point, rules: Rule[]): any {
        if (this.validateValuesForBestRoute(matrix, start, end, rules)) {

        }
    }
    public validateValuesForBestRoute(matrix: Matrix, start: Point, end: Point, rules: Rule[]): boolean {
        const points = new Point[0];
        points.push(matrix.points);
        points.push(start); points.push(end);
        rules.map((rule) => {
            if (rule.type === "follow") {
                points.push(new Point(rule.value.Latitude, rule.value.Longitude));
            }
        });
        if (!points.some((point) => { return !this.validatePointInMatrix(matrix, point)})) {
            return false;
        }
        return false;
    }
    public validatePointInMatrix(matrix: Matrix, location: Point): boolean {
        return matrix.points.some((point) => {
            return point.Latitude == location.Latitude && point.Longitude == location.Longitude;
        })
    }
}
export default Pathfinder;
