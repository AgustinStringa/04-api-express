import express from "express";
import { db } from "./shared/db/db.js";
import { routerApi } from "./routes/index.js";
import { pool } from "./shared/db/db.mysql.js";
import { Character } from "./character/Character.entity.js";
const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/users", async (req, res, err) => {
  const mongo = await db.collection("users");
  const users = await mongo.find({}).limit(15).toArray();
  console.log(users);
  res.json(users);
});

app.get("/mysql", async (req, res, err) => {
  const [characters] = await pool.query("SELECT * FROM characters");

  //restaría consultar a la DB por los items cuyo id sea el de este personaje
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
  res.send(characters as Character[]);
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
