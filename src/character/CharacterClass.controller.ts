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
        length: characterclasses.length,
        data: characterclasses,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  findOne: async function (req: Request, res: Response) {
    const { id } = req.params;
    try {
      const characterclass = await em.find(CharacterClass, {
        id: Number.parseInt(id),
      });
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
        message: "characterclass created",
        data: newCharacterClass,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  delete: async function (req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const characterClass = em.getReference(CharacterClass, id);
      // await em.remove() --> si sigo haciendo operaciones
      // await em.removeFlush() --> si es la unica operacion
      await em.removeAndFlush(characterClass);
      //con remove puedo suscribirme a los cambios para ver que ocurre
      // gralmente en los ORM remove permite suscribirse, delete no
      // res.status(204).send();
      res.status(200).send({ message: "characterclass removed" });
    } catch (error) {
      res.status(500).json({ message: "not implemented" });
    }
  },
  update: async function (req: Request, res: Response) {
    try {
      //una opcion es buscar el objeto y modificarlo
      /***OPCION 1 */
      //const id = Number.parseInt(req.params.id);
      //const characterclass = await em.findOneOrFail(Characterclass, {id})
      //characterClass.name = req.body.name. Lo mismo con demas props
      // o usar directamente em.assign(CharacterClass, req.body)
      //await em.flush()
      //otra opcion es usar getReference.

      /***OPCION 2 */

      /**la opcion 2 realiza un solo acceso a la base de datos. */
      /**en caso de querer retornar la lista de characters, sería necesario otro acceso. */
      const id = Number.parseInt(req.params.id);
      const characterClass = em.getReference(CharacterClass, id);
      em.assign(characterClass, req.body);
      await em.flush();
      res.status(200).send({ message: "characterclass updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "not implemented" });
    }
  },
};

export { controller };
