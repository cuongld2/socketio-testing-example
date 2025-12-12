import { Serializable } from "node:child_process";
import { Socket } from "socket.io-client";

export async function asyncEmitSocket(socket: Socket, event: string, message: string="", timeout:number=1000):Promise<Serializable> {
    return new Promise((resolve, reject) => {
        if (message){
            socket.emit(event, message);
        }
        socket.on(event, (data) => {
                resolve(data);
        });
        socket.off(event, (data) => {
                resolve(data);
        });
        setTimeout(() => {
            reject(new Error("Timeout error waiting for event message"))},
            timeout);
        });
}

export async function asyncListenSocket(socket: Socket, event: string) {
    return new Promise((resolve, reject) => {
            socket.timeout(3000);
            socket.on(event, (data) => {
                resolve(data);
        });
    });
};