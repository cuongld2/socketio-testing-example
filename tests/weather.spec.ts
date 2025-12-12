
import { io, Socket, Manager } from "socket.io-client";
import { asyncEmitSocket, asyncListenSocket } from "../utils/websocket";
import test, { expect } from "@playwright/test";
import { cityWeather } from "../types/weather";

const socket = io("http://localhost:3000", {
  autoConnect: true,
  transports: ["websocket"],
});

test("weather", async ({}) => {
  const city = "Texas";

  const weatherResponse = await asyncEmitSocket(socket, "weather", city) as cityWeather;
  console.log("weatherResponse");
  console.log(weatherResponse);
  expect(weatherResponse.city).toBe(city);
  
});

test("invalid event", async ({}) => {
  const city = "Texas";

  const invalidEventResponse = await asyncEmitSocket(socket, "invalid", city,) as string;
  console.log("invalidEventResponse");
  console.log(invalidEventResponse);
  expect(invalidEventResponse).toBe("Unsupported event");
  
});