const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const port = 4003;
const app = express();
const server = createServer(app);
const io = new Server(server,{
  connectionStateRecovery: {}
});
const { availableParallelism } = require("node:os");
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
io.on("connection", (socket) => {
  console.log("a user connected");
  const ipAddress = socket.handshake.address;
  console.log(ipAddress);
  console.log(socket.recovered);
  socket.on("chat message", (msg, callback) => {
    callback(msg);
  });
  io.emit("server message", "Asssalamu Alykum, How Can i help you?");
  socket.join("news");
  io.to("news").emit("newsEvent", "This is from news room");
   // leave the room
   socket.leave('news');
  socket.broadcast.emit("hi", "Hi");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(port, () => {
  // console.log(availableParallelism());
  console.log(`Example app listening on port ${port}`);
});
