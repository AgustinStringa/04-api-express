import express from "express";
import { sanitizeCharacterInput } from "../middlewares/sanitizeCharacterInput.js";
import { Character } from "./Character.entity.js";
import { characters } from "./Character.repository.js";
const characters_router = express.Router();

characters_router.get("/:id", (req, res) => {
  const { id } = req.params;
  const character = characters.find((c) => c.id === id);
  if (!character) {
    res.status(404).send({ message: "character not found" });
  } else {
    res.send({ data: character }).status(200);
  }
});
characters_router.get("/", (req, res) => {
  res.send({ data: characters });
});

characters_router.post("/", sanitizeCharacterInput, (req, res) => {
  const { name, characterClass, level, hp, mana, attack, items } =
    req.body.sanitizedInput;
  const newCharacter = new Character(
    name,
    characterClass,
    level,
    hp,
    mana,
    attack,
    items
  );
  characters.push(newCharacter);
  //another common response is id
  res.send({ message: "character created", data: newCharacter }).status(201);
});

export { characters_router };
