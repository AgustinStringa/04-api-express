import express from "express";
import { sanitizeCharacterInput } from "../middlewares/sanitizeCharacterInput.js";
import { controller } from "./CharacterClass.controller.js";
const characters_class_router = express.Router();

characters_class_router.get("/:id", controller.findOne);
characters_class_router.get("/", controller.findAll);

characters_class_router.post("/", sanitizeCharacterInput, controller.add);

characters_class_router.put("/:id", sanitizeCharacterInput, controller.update);

characters_class_router.patch(
  "/:id",
  sanitizeCharacterInput,
  controller.update
);

characters_class_router.delete("/:id", controller.delete);

export { characters_class_router };
