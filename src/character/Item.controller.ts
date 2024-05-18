import { Request, Response } from "express";
import { Item } from "./Item.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(Item);

const controller = {
  findAll: async function (req: Request, res: Response) {
    try {
      const items = await em.find(Item, {});
      res.status(200).json({
        message: "find all items",
        length: items.length,
        data: items,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  findOne: async function (req: Request, res: Response) {
    const { id } = req.params;
    try {
      const item = await em.find(Item, { id: Number.parseInt(id) });
      res.status(200).json({
        message: "find one Item",
        data: item,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  add: async function (req: Request, res: Response) {
    try {
      const newItem = em.create(Item, req.body);
      await em.flush();
      //flush() se ejecuta una sola vez en el caso de uso.
      //allí, se ejecutan todas las op de la base de datos
      res.status(201).json({
        message: "Item created",
        data: newItem,
      });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  delete: async function (req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const item = em.getReference(Item, id);
      await em.removeAndFlush(item);
      res.status(200).send({ message: "Item removed" });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
  update: async function (req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const item = em.getReference(Item, id);
      em.assign(item, req.body);
      await em.flush();
      res.status(200).send({ message: "Item updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal error" });
    }
  },
};

export { controller };
