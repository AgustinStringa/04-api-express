import { Request, Response } from "express";
import { CharacterClass } from "./CharacterClass.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(CharacterClass);

const controller = {
  findAll: async function (req: Request, res: Response) {
    try {
      const characterclasses = await em.find(CharacterClass, {});
      res.status(200).json({
        message: "find all character classes",
        data: characterclasses,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  findOne: async function (req: Request, res: Response) {
    const { id } = req.params;
    try {
      const characterclass = await em.find(CharacterClass, { id: Number(id) });
      res.status(200).json({
        message: "find one characterClass",
        data: characterclass,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  add: async function (req: Request, res: Response) {
    try {
      const newCharacterClass = em.create(CharacterClass, req.body);
      await em.flush();
      //flush() se ejecuta una sola vez en el caso de uso.
      //allí, se ejecutan todas las op de la base de datos
      res.status(201).json({
        message: "created",
        data: newCharacterClass,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  delete: async function (req: Request, res: Response) {
    res.status(500).json({ message: "not implemented" });
  },
  update: async function (req: Request, res: Response) {
    res.status(500).json({ message: "not implemented" });
  },
};

export { controller };
