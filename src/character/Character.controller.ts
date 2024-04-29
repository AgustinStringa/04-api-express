import { Request, Response } from "express";
import { CharacterRepository } from "./Character.repository.js";
import { Character } from "./Character.entity.js";

const repository = new CharacterRepository();

const controller = {
  findAll: async function (req: Request, res: Response) {
    res.json({ data: await repository.findAll() });
  },
  findOne: async function (req: Request, res: Response) {
    const { id } = req.params;
    //try-catch??
    const character = await repository.findOne({ id: id });
    if (!character) {
      res.status(404).send({ message: "character not found" });
    } else {
      res.json({ data: character }).status(200);
    }
  },
  add: async function (req: Request, res: Response) {
    const { name, characterClass, level, hp, mana, attack, items } =
      req.body.sanitizedInput;
    const newCharacter = await repository.add(
      new Character(name, characterClass, level, hp, mana, attack, items)
    );
    //another common response is id
    res.json({ message: "character created", data: newCharacter }).status(201);
  },
  delete: async function (req: Request, res: Response) {
    const { id } = req.params;
    const character = await repository.delete({ id: id });

    if (!character) {
      res.status(404).send("character not found").status(404);
    } else {
      res.json({ message: "character deleted", data: character }).status(200);
    }
  },
  update: async function (req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id;
    const character = await repository.update(req.body.sanitizedInput);
    if (!character) {
      res.send({ message: "character not found" }).status(404);
    } else {
      res.status(200).send({ message: "character updated", data: character });
    }
  },
};

export { controller };
