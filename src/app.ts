import express from "express";
import { db } from "./shared/db/db.js";
import { routerApi } from "./routes/index.js";
import { pool } from "./shared/db/db.mysql.js";
import { Character } from "./character/Character.entity.js";
import { CharacterRepository } from "./character/Character.repository.mysql.js";
import { sanitizeCharacterInput } from "./middlewares/sanitizeCharacterInput.js";
const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/users", async (req, res, err) => {
  const mongo = await db.collection("users");
  const users = await mongo.find({}).limit(15).toArray();
  console.log(users);
  res.json(users);
});

app.get("/mysql/characters", async (req, res, err) => {
  const repo = new CharacterRepository();
  const characters = await repo.findAll();
  res.send(characters as Character[]);
});

app.get("/mysql/characters/:id", async (req, res, err) => {
  const { id } = req.params;
  const repo = new CharacterRepository();
  const character = await repo.findOne({ id });
  res.send(character);
});

app.post(
  "/mysql/characters/",
  sanitizeCharacterInput,
  async (req, res, err) => {
    const repo = new CharacterRepository();
    const { name, characterClass, level, hp, mana, attack, items } =
      req.body.sanitizedInput;
    const newCharacter = await repo.add(
      new Character(name, characterClass, level, hp, mana, attack, items)
    );
    res.send(newCharacter);
  }
);

app.delete("/mysql/characters/:id", async (req, res, err) => {
  const { id } = req.params;
  const repo = new CharacterRepository();
  const character = await repo.remove({ id });
  res.send(character);
});
routerApi(app);

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
app.listen(PORT, () => {
  console.log(`listening at port http://localhost:${PORT}`);
});
