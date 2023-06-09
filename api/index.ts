import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import controllers from "../src/controllers/Controllers";
import { StartDBConnection } from "../src/db/DB";
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 1234;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

controllers.forEach((controller) => {
  app[controller.method](controller.path, controller.handler);
});

StartDBConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server has successfully started on port:${port}`);
  });
});
