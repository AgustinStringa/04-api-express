import express from "express";
import { db } from "./shared/db.js";
import { routerApi } from "./routes/index.js";

const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/users", async (req, res, err) => {
  const mongo = await db.collection("users");
  const users = await mongo.find({}).limit(15).toArray();
  console.log(users);
  res.json(users);
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
