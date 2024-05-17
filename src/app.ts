import "reflect-metadata";
import express from "express";
import { routerApi } from "./routes/index.js";
import { orm, syncnSchema } from "./shared/db/orm.js";
import { RequestContext } from "@mikro-orm/core";
const PORT = 3000;
const app = express();
app.use(express.json());

//luego de middlewares base
app.use((req, res, next) => {
  //.em -> entity manager. Abstraccion que permite manejar todas las entidades definidas
  // se manejan uniforme y desde un mismo punto.
  RequestContext.create(orm.em, next);
});
await syncnSchema();
//antes de las rutas

routerApi(app);

app.listen(PORT, () => {
  console.log(`listening at port http://localhost:${PORT}`);
});
