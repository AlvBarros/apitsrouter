import { Path } from "../path/Path";

export class Point {
    public Latitude: number;
    public Longitude: number;
    public possiblePaths: Path[];

    constructor(lat: number, long: number) {
        this.Latitude = lat;
        this.Longitude = long;
    }

    public addPaths(paths: Path[]) {
        this.possiblePaths = paths;
    }
}
export default Point;
