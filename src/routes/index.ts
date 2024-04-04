import express, { Application } from "express";
import { characters_router } from "../character/Character.routes.js";

function routerApi(app: Application) {
  const routerv1 = express.Router();
  app.use("/api/", routerv1);
  routerv1.use("/characters", characters_router);
  app.use((req, res) => {
    res.status(404).json({ message: "Resoruce not found" });
  });
}

export { routerApi };
