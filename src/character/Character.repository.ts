import { Repository } from "../shared/repository.js";
import { Character } from "./Character.entity.js";
import { db } from "../shared/db/db.js";
import { ObjectId } from "mongodb";
export const charactersArray = [
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

//declarado aqui fuera de la clase para que no sea modificable
const characters = db.collection<Character>("characters");

export class CharacterRepository implements Repository<Character> {
  public async findAll(): Promise<Character[] | undefined> {
    return await characters.find({}).toArray();
  }
  public async findOne(item: { id: string }): Promise<Character | undefined> {
    return (
      (await characters.findOne({ _id: new ObjectId(item.id) })) || undefined
    );
  }
  public async add(item: Character): Promise<Character | undefined> {
    //asumimos que el item es una entrada ya sanitizada.
    //la tarea de sanitizacion no corresponde a esta capa
    item._id = (await characters.insertOne(item)).insertedId;
    return item || undefined;
  }
  public async update(item: Character): Promise<Character | undefined> {
    const { id, ...characterInput } = item;
    return (
      (await characters.findOneAndUpdate(
        { _id: new ObjectId(item.id) },
        {
          $set: {
            ...characterInput,
          },
        },
        { returnDocument: "after" }
      )) || undefined
    );
  }
  public async remove(item: { id: string }): Promise<Character | undefined> {
    const chr = await characters.findOne({ _id: new ObjectId(item.id) });
    await characters.deleteOne({ _id: new ObjectId(item.id) });
    return chr || undefined;
  }
}
