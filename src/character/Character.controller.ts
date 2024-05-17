import { Request, Response } from "express";
import { Character } from "./Character.entity.js";

const controller = {
  findAll: async function (req: Request, res: Response) {
    res.status(500).json({ message: "not implemented" });
  },
  findOne: async function (req: Request, res: Response) {
    const { id } = req.params;
    res.status(500).json({ message: "not implemented" });
  },
  add: async function (req: Request, res: Response) {
    res.status(500).json({ message: "not implemented" });
  },
  delete: async function (req: Request, res: Response) {
    res.status(500).json({ message: "not implemented" });
  },
  update: async function (req: Request, res: Response) {
    res.status(500).json({ message: "not implemented" });
  },
};

export { controller };
