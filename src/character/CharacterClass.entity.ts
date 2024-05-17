import {
  Entity,
  Property,
  OneToMany,
  Cascade,
  Collection,
} from "@mikro-orm/core";
import { Character } from "./Character.entity.js";
import { BaseEntity } from "../shared/db/BaseEntity.entity.js";
/**
 * @Entity() --> es un decorador. agrega info a la definicion de la clase.
 * mikroorm entiende que es una coleccion y demas datos en la DB.,
 */

@Entity()
export class CharacterClass extends BaseEntity {
  //posponer ! indica obligatoriedad de la propiedad
  @Property({ nullable: false, unique: true })
  name!: string;

  @Property()
  description!: string;

  //esto significa que una clase tiene varios characters
  @OneToMany(() => Character, (char) => char.characterClass, {
    cascade: [Cascade.ALL],
  })
  characters = new Collection<Character>(this);
}
