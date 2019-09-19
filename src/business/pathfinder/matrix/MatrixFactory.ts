import Matrix from "./Matrix";
import Path from "../path/Path";
import Point from "../point/Point";

export class MatrixFactory {
    public matrixFromPathsAndPointsArray(points: Point[], paths: Path[]): Matrix {
        return new Matrix(points, paths);
    }

}
export default MatrixFactory;
