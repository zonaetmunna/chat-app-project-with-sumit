// external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("express/lib/response");
const { urlencoded } = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// internal import
const loginRouter = require("./routers/loginRouter");
const inboxRouter = require("./routers/inboxRouter");
const usersRouter = require("./routers/usersRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

// app declared
const app = express();

// port declared
const port = process.env.PORT || 5000;

// mongodatabase connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successfully"))
  .catch((err) => console.log(err));

/* Parser */
//request parser middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
// set view engine
app.set("view engine", "ejs");
// set static folder
app.use(express.static(path.join(__dirname, "public")));
// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

//entry api
app.get("/", (req, res) => {
  res.json("this is first chat app api");
});

/*  routing */
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

/* error handling */
// 404 not found error handler
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("listing the port", port);
});
