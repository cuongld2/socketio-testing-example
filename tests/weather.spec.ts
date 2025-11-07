
import { io, Socket, Manager } from "socket.io-client";
import { asyncEmitSocket, asyncListenSocket } from "../utils/websocket";
import test, { expect } from "@playwright/test";

test("weather", async ({}) => {
const socket = io("http://localhost:3000", {
  autoConnect: true,
  transports: ["websocket"],
});

  const helloResponse = await asyncListenSocket(socket, "hello",);
  console.log(helloResponse);

  const weatherResponse = await asyncEmitSocket(socket, "weather", "Texas");
  console.log("weatherResponse");
  console.log(weatherResponse);
  expect(weatherResponse["city"]).toBe("Texas");
  
});