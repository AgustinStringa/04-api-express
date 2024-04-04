import { Repository } from "../shared/repository.js";
import { Character } from "./Character.entity.js";

export const characters = [
  new Character(
    "Darth Vader",
    "Sith",
    10,
    100,
    20,
    10,
    ["Lightsaber", "Death Star"],
    "a02b91bc-3769-4221-beb1-d7a3aeba7dad"
  ),
];

export class CharacterRepository implements Repository<Character> {
  findAll(): Character[] | undefined {
    throw new Error("Method not implemented.");
  }
  findOne(item: { id: string }): Character | undefined {
    throw new Error("Method not implemented.");
  }
  add(item: Character): Character | undefined {
    throw new Error("Method not implemented.");
  }
  update(item: Character): Character | undefined {
    throw new Error("Method not implemented.");
  }
  delete(item: { id: string }): Character | undefined {
    throw new Error("Method not implemented.");
  }
}
