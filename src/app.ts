import express from "express";
import { routerApi } from "./routes/index.js";
const PORT = 3000;
const app = express();
app.use(express.json());

routerApi(app);

app.listen(PORT, () => {
  console.log(`listening at port http://localhost:${PORT}`);
});
