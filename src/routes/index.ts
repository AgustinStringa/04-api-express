import express, { Application } from "express";
import { characters_router } from "./characters.js";

function routerApi(app: Application) {
  const routerv1 = express.Router();
  app.use("/api/", routerv1);
  routerv1.use("/characters", characters_router);
}

export { routerApi };
