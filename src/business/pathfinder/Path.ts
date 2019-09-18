import { Point } from "./point/Point";

export class Path {
    public points: Point[];
    public distance;

    constructor(points: Point[]) {
        this.points = points;
    }
}
export default Path;
