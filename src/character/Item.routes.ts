import express from "express";
import { sanitizeCharacterInput } from "../middlewares/sanitizeCharacterInput.js";
import { controller } from "./Item.controller.js";
const items_router = express.Router();

items_router.get("/:id", controller.findOne);
items_router.get("/", controller.findAll);

items_router.post("/", controller.add);

items_router.put("/:id", controller.update);

items_router.patch("/:id", controller.update);

items_router.delete("/:id", controller.delete);

export { items_router };
