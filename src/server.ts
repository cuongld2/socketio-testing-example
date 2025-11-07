 import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cityWeather from '../city-weather.json';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: false,
    maxAge: 3600
  }
  /* options */ });

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

io.on("connection", (socket) => {
  socket.on('connect_error', (err) => {
    console.error(`Socket connection error: ${err.message}`);
  });
  socket.on('error', (err) => {
    console.error(`Socket error for client ${socket.id}:`, err);
    // You might want to log the error, notify administrators,
    // or attempt to recover if possible (though often, a client-side reconnect is needed).
  });
  socket.emit("hello", "world");
  console.log("Upp");
  socket.on("weather", (city) => {
    console.log(cityWeather.filter((weather) => weather.city === city));
    socket.emit("weather", cityWeather.filter((weather) => weather.city === city)[0]);
  });
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});