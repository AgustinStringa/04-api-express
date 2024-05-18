import { Request, Response } from "express";
import { Character } from "./Character.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(Character);
const controller = {
  findAll: async function (req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const characters = await em.find(
        Character,
        {},
        { populate: ["characterClass", "items"] }
      );
      //mediante el tercer parametro populate:[] se indica por array las entidades con que se relacione (especificadas en el ORM)
      res
        .status(200)
        .send({ message: "find all characters", data: characters });
    } catch (error) {
      res.status(500).json({ message: "not implemented" });
    }
  },
  findOne: async function (req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const character = await em.findOneOrFail(
        Character,
        { id },
        { populate: ["characterClass", "items"] }
      );
      res.status(200).send({ message: "find one character", data: character });
    } catch (error) {
      res.status(500).json({ message: "not implemented" });
    }
  },
  add: async function (req: Request, res: Response) {
    try {
      const newCharacter = em.create(Character, req.body.sanitizedInput);
      //a la hora de construir la api debo decidir si envio el id directamente o un objeto con id u otra prop
      /**
       * ej:
       * body: {
       * characterClass: 1
       * }
       * o
       * body: {
       * characterClass: {id:1}
       * }
       */
      //mismo caso para el id de los items

      await em.flush();
      res.status(201).json({
        message: "Character created",
        data: newCharacter,
      });
    } catch (error) {
      res.status(500).json({ message: "not implemented" });
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
