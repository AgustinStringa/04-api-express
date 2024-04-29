import express from "express";
import { routerApi } from "./routes/index.js";
import { MongoClient, ServerApiVersion } from "mongodb";
const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/users", async (req, res, err) => {
  const uri =
    "mongodb+srv://stringaagustin1:kBdpBd9CXSeXpshJ@cluster0.asqcnur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();

  const mongo = await client.db("sample_mflix").collection("users");
  const users = await mongo.find({}).limit(15).toArray();
  console.log(users);
  res.json(users);
  await client.close();
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
