import Point from "../point/Point";
import Path from "../path/Path";

export class Matrix {
    public points = new Point[0];
    public paths = new Path[0];

    constructor(points: Point[], paths: Path[]) {
        this.points = points;
        this.paths = paths;
    }
}
export default Matrix;
