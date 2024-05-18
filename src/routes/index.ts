import express, { Application } from "express";
import { characters_router } from "../character/Character.routes.js";
import { characters_class_router } from "../character/CharacterClass.routes.js";
import { items_router } from "../character/Item.routes.js";

function routerApi(app: Application) {
  const routerv1 = express.Router();
  app.use("/api/", routerv1);
  routerv1.use("/characters", characters_router);
  routerv1.use("/characterclasses", characters_class_router);
  routerv1.use("/items", items_router);
  app.use((req, res) => {
    res.status(404).json({ message: "Resoruce not found" });
  });
}

export { routerApi };
