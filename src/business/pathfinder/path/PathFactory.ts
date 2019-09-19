import Point from "../point/Point";

import Path from "./Path";

export class PathFactory {
    public pathsFromPointsAndDurations(points: Point[], durations: number[][]) {
        const paths = [];
        if (this.validateDurationsArray(points, durations)) {
            durations.map((arr, i) => {
                arr.map((duration, j) => {
                    if (duration !== 0) {
                        paths.push(new Path([points[i], points[j]], duration));
                    }
                });
            });
        } else { throw Error("Invalid points or durations information."); }
        return paths;
    }
    public validateDurationsArray(points: Point[], durations: number[][]): boolean {
        return durations.length === points.length &&
            !durations.some((arr) => arr.length !== points.length);
    }
}
export default PathFactory;
