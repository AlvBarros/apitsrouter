import Pathing from "../controllers/pathing/Pathing";
import Session from "../controllers/session/Session";

import Controller from "../../business/templates/Controller";

export class Controllers {
    private controllers: Controller[] = [
        new Session(), new Pathing()
    ];

    constructor() {
        this.controllers.forEach((controller) => {
            controller.initializeRouter();
        });
    }

    public all(): Controller[] {
        return this.controllers;
    }
}
