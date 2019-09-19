import Rule from "./Rule";
import Point from "../point/Point";
import { isNumber } from "util";

export class RuleFactory {
    public readonly types = [
        "follow", // is right after point X
        "position" // must be the N destination
    ];
    
    public createRule(type: string, value: any) {
        if (this.types.includes(type) && this.validateValueForType(type, value)) {
            return new Rule(type, value);
        }
    }
    public validateValueForType(type: string, value: any): boolean {
        switch(type){
            case "follow":
                return value.Latitude && value.Longitude;
            case "position":
                return isNumber(value) && value > 0;
            default:
                throw new Error(`Error on rule type "${type}", value "${JSON.stringify(value)}"`);
        }
    }
}
export default RuleFactory;