import * as express from "express";

import Controller from "../../../business/templates/Controller";
import Route from "../../../business/templates/Route";

import User from "../../../business/account/User";

import { UserDTO } from "../../../database/dtos/UserDTO";

import UserFactory from "../../../business/account/UserFactory";
import RouteFactory from "../RouteFactory";

import Authorization from "../../middlewares/Authorization";

import Authenticator from "../../services/security/Authenticator";

export class Session extends Controller {
    public path: string = "session";
    public router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public auth: Authenticator = new Authenticator();
    public autho: Authorization = new Authorization();
    public userDTO: UserDTO = new UserDTO();
    public userFactory = new UserFactory();

    public login: Route = this.routeFactory.createAnonymousRoute("POST", "login",
        async (request: express.Request, response: express.Response) => {
            if (this.validateBody(request.body)) {
                this.userDTO.queryByEmail(request.body.email).then((result) => {
                    if (result) {
                        const user = result;
                        if (user.email === request.body.email &&
                            user.password === request.body.password) {
                                user.password = "";
                                this.auth.generateToken(user).then((token) => {
                                    response.json({ token });
                                }).catch((err) => {
                                    throw new Error("Unable to generate token.");
                                });
                        } else {
                            throw new Error("Invalid credentials.");
                        }
                    }
                }).catch((err) => { response.json({ error: err.message }); });
            } else {
                response.json({ error: "Invalid request body." });
            }
        }
    );

    public register: Route = this.routeFactory.createAnonymousRoute("POST", "register",
        async (request: express.Request, response: express.Response) => {
            const body = request.body;
            if (this.validateBody(body)) {
                this.userDTO.queryByEmail(body.email).then((result) => {
                    if (!result) {
                        const user = this.userFactory.userRegistration(body.name, body.email, body.password);
                        this.userDTO.register(user).then((registered) => {
                            if (registered) {
                                this.auth.generateToken(user).then((token) => {
                                    response.json({ token });
                                }).catch((err) => {
                                    throw err;
                                });
                            } else {
                                throw new Error("Failed to register to database.");
                            }
                        });
                    } else {
                        throw new Error("E-mail already registered.");
                    }
                }).catch((err) => {
                    response.json({ error: err.message });
                });
            }
        }
    );

    public verifyTokenGet: Route = this.routeFactory.createRoute("GET", "verify",
        async (request: express.Request, response: express.Response) => {
            response.send("Token verified.");
        }
    );
    public verifyTokenPost: Route = this.routeFactory.createRoute("POST", "verify",
        async (request: express.Request, response: express.Response) => {
            response.send("Token verified.");
        }
    );

    public routes: Route[] = [
        this.login, this.register, this.verifyTokenGet, this.verifyTokenPost
    ];

    public validateBody(body: { email: string, password: string }): boolean {
        return (!!body.email && !!body.password);
    }
}

export default Session;
