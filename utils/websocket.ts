import { Serializable } from "node:child_process";
import { Socket } from "socket.io-client";

export async function asyncEmitSocket(socket: Socket, event: string, message: string):Promise<Serializable> {
    return new Promise((resolve, reject) => {
        socket.emit(event, message);
        socket.on(event, (data) => {
            resolve(data);
            socket.off(event);
            setTimeout(() => {
                socket.off(event);
                reject("timeout");
            }, 1000);
        });
    });
}

export async function asyncListenSocket(socket: Socket, event: string) {
    return new Promise((resolve, reject) => {
        socket.on(event, (data) => {
            resolve(data);
            socket.off(event);
            setTimeout(() => {
                socket.off(event);
                reject("timeout");
            }, 1000);
        });
    });
};