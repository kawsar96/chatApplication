// external imports
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

// internal exports
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket initialization
const io = require("socket.io")(server);
global.io = io;

// set moment as app locals
app.locals.moment = moment;

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {})
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`app is listening to port ${process.env.PORT}`);
});

// // Listen for WebSocket connections
// io.on("connection", (socket) => {
//   console.log("A client connected with ID:", socket.id);

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });
