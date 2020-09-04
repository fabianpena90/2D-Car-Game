const express = require('express')
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


// Listening for when websites accessed by new client
io.on('connection', (socket) => {
  console.log('a user connected');
// listening for keypress on client side (public)
  socket.on("keypressed", (action => {
    // broadcast action to all clients (function named action)
    io.emit("carmove", action)
  }))
});

http.listen(port, function () {
  console.log("listening on " + port);
});