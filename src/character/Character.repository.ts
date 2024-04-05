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
    const characterIdx = characters.findIndex((c) => c.id === item.id);
    if (characterIdx !== -1) {
      characters[characterIdx] = {
        ...characters[characterIdx],
        ...item,
      };
      return characters[characterIdx];
    }
  }
  delete(item: { id: string }): Character | undefined {
    const characterIdx = characters.findIndex((c) => c.id === item.id);

    if (characterIdx !== -1) {
      const characterToRemove = characters[characterIdx];
      characters.splice(characterIdx, 1);
      return characterToRemove;
    }
  }
}
