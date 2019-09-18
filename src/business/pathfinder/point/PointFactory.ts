import Point from "./Point";

export class PointFactory {
    public pointsFromArray(arr: any[]): Point[] {
        const points = [];
        if (this.validateAnyArray(arr)) {
            arr.map((point) => {
                points.push(new Point(point.Latitude, point.Longitude));
            });
        } else { throw Error("Invalid point information."); }
        return points;
    }

    public validateAnyArray(objs: any[]): boolean {
        if (objs && objs.length > 0) {
            return !objs.some((obj) => {
                return !this.validateAnyObject(obj); });
        }
        return false;
    }

    public validateAnyObject(obj: any): boolean {
        if (obj) { return obj.Latitude && obj.Longitude; }
        return false;
    }
}

export default PointFactory;
