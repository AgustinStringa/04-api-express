import { Repository } from "../shared/repository.js";
import { Character } from "./Character.entity.js";
import { db } from "../shared/db/db.js";
import { pool } from "../shared/db/db.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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
  public async add(item: Character): Promise<Character | undefined> {
    const valuesArray = [];
    const itemsArray = [];
    for (const [k, v] of Object.entries(item)) {
      if (k != "items" && k != "id" && k != "_id") valuesArray.push(String(v));
      if (k == "items") itemsArray.push(...v);
    }
    const [insert] = await pool.query<ResultSetHeader>(
      "INSERT INTO characters (name, characterClass, level, hp, mana, attack) VALUES (?,?,?,?,?,?)",
      valuesArray
    );
    if (insert.insertId) {
      for (const item of itemsArray) {
        const insertItems = await pool.query(
          "INSERT INTO characterItems (characterId, itemName) VALUES (?,?)",
          [insert.insertId, item]
        );
      }
    }

    return item || undefined;
  }
  public async update(item: Character): Promise<Character | undefined> {
    return undefined;
  }
  public async remove(item: { id: string }): Promise<Character | undefined> {
    const [itemsDeleted] = await pool.query<ResultSetHeader>(
      "DELETE FROM characteritems WHERE characterId = ?",
      item.id
    );
    if (itemsDeleted.affectedRows > 0) {
      const [characterDeleted] = await pool.query(
        "DELETE FROM characters WHERE id = ?",
        item.id
      );
    }

    return undefined;
  }
}
