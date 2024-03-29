import express from "express";

const app = express();
app.use("/*", (req, res) => {
  res.send("Hello Web");
});

app.listen(3000, () => {
  console.log("listening");
});
