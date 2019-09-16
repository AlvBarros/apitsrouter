import Socket from "../../business/templates/Socket";

export class Sockets {
    private sockets: Socket[] = [
        //  empty
    ];

    constructor() {
        // this.sockets.forEach((socket) => {
        //     socket.initialize();
        // });
    }

    public all(): Socket[] {
        return this.sockets;
    }
}
