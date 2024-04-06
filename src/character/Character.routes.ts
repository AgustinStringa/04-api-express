import express from "express";
import { sanitizeCharacterInput } from "../middlewares/sanitizeCharacterInput.js";
import { controller } from "./Character.controller.js";
const characters_router = express.Router();

characters_router.get("/:id", controller.findOne);
characters_router.get("/", controller.findAll);

characters_router.post("/", sanitizeCharacterInput, controller.add);

characters_router.put("/:id", sanitizeCharacterInput, controller.update);

characters_router.patch("/:id", sanitizeCharacterInput, controller.update);

characters_router.delete("/:id", controller.delete);

export { characters_router };
