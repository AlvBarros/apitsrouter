import { Point } from "../../../business/pathfinder/point/Point";
import HttpHelper from "../utils/HttpHelper";
import token from "./token.json";

import * as rp from "request-promise";

export class OpenRouteService {
    public readonly apikey = token["api-key"];
    public readonly host = "api.openrouteservice.org";
    public readonly httpHelper = new HttpHelper();

    public async getDirections(start: Point, end: Point) {
        const coords = `&start=${start.Latitude + "," + start.Longitude}&end=${end.Latitude + "," + end.Longitude}`;

        const options = {
            json: true,
            method: "GET",
            uri: `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${this.apikey}${coords}`
        };

        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${this.apikey}${coords}`;
        return this.httpHelper.getRequest(url);
    }

}
export default OpenRouteService;
