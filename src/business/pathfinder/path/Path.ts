import { Point } from "../point/Point";

export class Path {
    public points: Point[];
    public duration: number;

    constructor(points: Point[], duration: number) {
        this.points = points;
        this.duration = duration;
    }
}
export default Path;
