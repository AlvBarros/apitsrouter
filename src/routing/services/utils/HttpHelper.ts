import * as http from "http";

import axios from "axios";
import { resolve } from "path";

export class HttpHelper {

    public getRequest(url: string): Promise<any> {
        return axios.get(url).then((response) => {
            return response.data;
        });
    }
}
export default HttpHelper;
