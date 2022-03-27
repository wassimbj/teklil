import express from "express";
const app = express();
import helmet from "helmet";
import constants from "./constants";
import passport from "passport";
import session from "./config/session";
import cors from "cors";
import path from "path";

// use helmet for basic security
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({ setTo: "Django" }));

app.use("/public", express.static(path.join(__dirname, "/public")));

// Parse incoming requests data
app.use(express.json({ extended: true, limit: "3mb" }));
app.use(express.urlencoded({ extended: false, limit: "3mb" }));

// use cors
app.use(
  cors({
    origin: constants.ACCEPTED_ORIGINS,
    credentials: true,
  })
);

app.set("port", parseInt(constants.PORT, 10));
if (constants.IS_PROD) {
  app.set("trust proxy", 1); // trust first proxy
}

// session
app.use(session());

// initialize passport
app.use(passport.initialize());

app.get("/", (req, res) => {
  return res.json("Welcome !!");
});

require("./routes")(app);

// 404 Catcher
app.use((req, res, next) => {
  res.status(404).json("Not Found");
  next();
});

export default app;
