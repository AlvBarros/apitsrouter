export class Rule {
    public type: string;
    public value: any;
    
    constructor(type: string, value: any) {
        this.type = type;
        this.value = value;
    }
}
export default Rule;