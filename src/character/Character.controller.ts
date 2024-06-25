import e, { Request, Response } from "express";
import { Character } from "./Character.entity.js";
import { orm } from "../shared/db/orm.js";
import { NotFoundError } from "@mikro-orm/core";
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
      res.status(200).send({
        message: "find all characters",
        lenght: characters.length,
        data: characters,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
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
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: `${error.message}` });
      } else {
        res.status(500).json({ message: "internal error" });
      }
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
      res.status(500).json({ message: "internal error" });
    }
  },
  delete: async function (req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const character = em.getReference(Character, id);
      await em.removeAndFlush(character);
      //si tuviese que eliminar varios -> remove y al final flush
      /**
       * al eliminar el character, dado lo indicado en la entity, elimina todos los reg en cascada que sean necesarios
       */
      res.status(200).send({ message: "character removed" });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  update: async function (req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const characterToUpdate = await em.findOneOrFail(Character, { id });
      em.assign(characterToUpdate, req.body.sanitizedInput);
      //si necesitasemos mas modificaciones (ej a items o a character class)
      //las realizo y luego flush
      await em.flush();
      res.status(200).send({ message: "character updated successfully" });
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: `${error.message}` });
      } else {
        res.status(500).json({ message: "internal error" });
      }
    }
  },
};

export { controller };
