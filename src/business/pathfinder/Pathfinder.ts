import { Dijkstra } from "./Dijkstra";
import { Path } from "./Path";
import { Point } from "./point/Point";

export class Pathfinder {
    public getPathBetweenPoints(points: Point[]): Path {
        return new Path(points);
    }
}
export default Pathfinder;
