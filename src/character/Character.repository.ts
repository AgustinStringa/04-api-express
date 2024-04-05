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
  public findAll(): Character[] | undefined {
    return characters;
  }
  public findOne(item: { id: string }): Character | undefined {
    return characters.find((c) => c.id === item.id);
  }
  public add(item: Character): Character | undefined {
    //asumimos que el item es una entrada ya sanitizada.
    //la tarea de sanitizacion no corresponde a esta capa
    characters.push(item);
    return item;
  }
  update(item: Character): Character | undefined {
    throw new Error("Method not implemented.");
  }
  delete(item: { id: string }): Character | undefined {
    throw new Error("Method not implemented.");
  }
}
