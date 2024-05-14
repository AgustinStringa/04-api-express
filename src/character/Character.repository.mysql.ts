import { Repository } from "../shared/repository.js";
import { Character } from "./Character.entity.js";
import { pool } from "../shared/db/db.mysql.js";
import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";

export class CharacterRepository implements Repository<Character> {
  public async findAll(): Promise<Character[] | undefined> {
    const [characters] = await pool.query("SELECT * FROM characters");
    for (const character of characters as Character[]) {
      const [items] = await pool.query(
        "SELECT * FROM characterItems WHERE characterId =?",
        character.id
      );
      character.items = [];
      for (const item of items as { itemName: string }[]) {
        character.items.push(item.itemName);
      }
    }
    return characters as Character[];
  }
  public async findOne(item: { id: string }): Promise<Character | undefined> {
    const id = Number.parseInt(item.id);
    const [characters] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM characters WHERE id=?",
      id
    );
    if (characters.length === 0) return undefined;

    for (const character of characters as Character[]) {
      const [items] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM characterItems WHERE characterId =?",
        id
      );
      character.items = [];
      for (const item of items as { itemName: string }[]) {
        character.items.push(item.itemName);
      }
    }

    return characters[0] as Character;
  }
  public async add(characterInput: Character): Promise<Character | undefined> {
    // const valuesArray = [];
    // const itemsArray = [];
    // for (const [k, v] of Object.entries(item)) {
    //   if (k != "items" && k != "id" && k != "_id") valuesArray.push(String(v));
    //   if (k == "items") itemsArray.push(...v);
    // }
    // const [insert] = await pool.query<ResultSetHeader>(
    //   "INSERT INTO characters (name, characterClass, level, hp, mana, attack) VALUES (?,?,?,?,?,?)",
    //   valuesArray
    // );
    // if (insert.insertId) {
    //   for (const item of itemsArray) {
    //     const insertItems = await pool.query(
    //       "INSERT INTO characterItems (characterId, itemName) VALUES (?,?)",
    //       [insert.insertId, item]
    //     );
    //   }
    // }

    const { _id, id, items, ...characterRows } = characterInput;
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO characters set ?",
      [characterRows]
    );

    // item.id = String(result.insertId);

    for (const item of items) {
      const insertItems = await pool.query("INSERT INTO characterItems set ?", {
        characterId: result.insertId,
        itemName: item,
      });
    }
    return characterInput || undefined;
  }
  public async update(
    characterInput: Character
  ): Promise<Character | undefined> {
    //update object

    const { id, items, ...characterRows } = characterInput;

    const characterId = Number(id);
    const update = await pool.query("UPDATE characters  set ? WHERE id = ?", [
      characterRows,
      characterId,
    ]);

    const character = await this.findOne({ id });

    if (items?.length > 0) {
      character ? (character.items = []) : null;
      await pool.query("delete from characterItems where characterId = ?", [
        characterId,
      ]);
      for (const item of items) {
        await pool.query("INSERT INTO characterItems set ?", {
          characterId: characterId,
          itemName: item,
        });

        character ? character.items.push(item) : null;
      }
    }

    return character as Character;
  }
  public async remove(item: { id: string }): Promise<Character | undefined> {
    const characterId = Number(item.id);
    const [itemsDeleted] = await pool.query<ResultSetHeader>(
      "DELETE FROM characteritems WHERE characterId = ?",
      characterId
    );
    const characterToDelete = await this.findOne({ id: item.id });

    await pool.query("DELETE FROM characters WHERE id = ?", characterId);

    return characterToDelete as Character;
  }
}
