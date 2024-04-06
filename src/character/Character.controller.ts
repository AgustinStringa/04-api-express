import { Request, Response } from "express";
import { CharacterRepository } from "./Character.repository.js";
import { Character } from "./Character.entity.js";

const repository = new CharacterRepository();

const controller = {
  findAll: function (req: Request, res: Response) {
    res.json({ data: repository.findAll() });
  },
  findOne: function (req: Request, res: Response) {
    const { id } = req.params;
    const character = repository.findOne({ id: id });
    if (!character) {
      res.status(404).send({ message: "character not found" });
    } else {
      res.json({ data: character }).status(200);
    }
  },
  add: function (req: Request, res: Response) {
    const { name, characterClass, level, hp, mana, attack, items } =
      req.body.sanitizedInput;
    const newCharacter = repository.add(
      new Character(name, characterClass, level, hp, mana, attack, items)
    );
    //another common response is id
    res.json({ message: "character created", data: newCharacter }).status(201);
  },
  delete: function (req: Request, res: Response) {
    const { id } = req.params;
    const character = repository.delete({ id: id });

    if (!character) {
      res.status(404).send("character not found").status(404);
    } else {
      res.json({ message: "character deleted", data: character }).status(200);
    }
  },
  update: function (req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id;
    const character = repository.update(req.body.sanitizedInput);
    if (!character) {
      res.send({ message: "character not found" }).status(404);
    } else {
      res.status(200).send({ message: "character updated", data: character });
    }
  },
};

export { controller };
