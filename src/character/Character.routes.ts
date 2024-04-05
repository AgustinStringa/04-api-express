import express from "express";
import { sanitizeCharacterInput } from "../middlewares/sanitizeCharacterInput.js";
import { Character } from "./Character.entity.js";
import { CharacterRepository } from "./Character.repository.js";
const characters_router = express.Router();

const repository = new CharacterRepository();
characters_router.get("/:id", (req, res) => {
  const { id } = req.params;
  const character = repository.findOne({ id: id });
  if (!character) {
    res.status(404).send({ message: "character not found" });
  } else {
    res.send({ data: character }).status(200);
  }
});
characters_router.get("/", (req, res) => {
  res.send({ data: repository.findAll() });
});

characters_router.post("/", sanitizeCharacterInput, (req, res) => {
  const { name, characterClass, level, hp, mana, attack, items } =
    req.body.sanitizedInput;
  const newCharacter = repository.add(
    new Character(name, characterClass, level, hp, mana, attack, items)
  );
  //another common response is id
  res.send({ message: "character created", data: newCharacter }).status(201);
});

characters_router.put("/:id", sanitizeCharacterInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id;
  const character = repository.update(req.body.sanitizedInput);
  if (!character) {
    res.send({ message: "character not found" }).status(404);
  } else {
    res.status(200).send({ message: "character updated", data: character });
  }
});

characters_router.patch("/:id", sanitizeCharacterInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id;
  const character = repository.update(req.body.sanitizedInput);
  if (!character) {
    res.send({ message: "character not found" }).status(404);
  } else {
    res.status(200).send({ message: "character updated", data: character });
  }
});

characters_router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const character = repository.delete({ id: id });

  if (!character) {
    res.status(404).send("character not found").status(404);
  } else {
    res.send({ message: "character deleted", data: character }).status(200);
  }
});

export { characters_router };
