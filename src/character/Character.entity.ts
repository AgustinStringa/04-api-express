import { BaseEntity } from "../shared/db/BaseEntity.entity.js";
import {
  Entity,
  ManyToOne,
  Property,
  Rel,
  Cascade,
  ManyToMany,
} from "@mikro-orm/core";
import { CharacterClass } from "./CharacterClass.entity.js";
import { Item } from "./Item.entity.js";

@Entity()
export class Character extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  level!: string;

  @Property({ nullable: false })
  hp!: number;

  @Property({ nullable: false })
  mana!: number;

  @Property({ nullable: false })
  attack!: number;

  //el modo en que se especifica la relacion puede entederse como "mirando el diagrama desde que lado estoy"
  @ManyToOne(() => CharacterClass, { nullable: false })
  characterClass!: Rel<CharacterClass>;

  //esta version del modelo permite que varios chars tengan un item
  @ManyToMany(() => Item, (item) => item.characters, {
    cascade: [Cascade.ALL],
    owner: true,
  })
  items!: Item[];
}
