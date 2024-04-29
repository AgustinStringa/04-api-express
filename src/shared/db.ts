import { MongoClient, ServerApiVersion, Db } from "mongodb";

const connectionStr =
  process.env.MONGO_URI ||
  "mongodb+srv://stringaagustin1:kBdpBd9CXSeXpshJ@cluster0.asqcnur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const cli = new MongoClient(connectionStr, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
await cli.connect();

export let db: Db = cli.db("sample_mflix");
