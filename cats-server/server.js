import express from "express";
import { db } from "./firebase.js";
import { v4 as uuid } from "uuid";
import cors from "cors";
import "dotenv";

const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(express.json());
// получение всех товаров
app.get("/items", async (req, res) => {
  const data = (await db.collection("items").get()).docs;
  const items = [];

  data.forEach((item) => {
    items.push(item.data());
  });

  res.json(items);
});
// получение информации о товаре
app.get("/items/:id", async (req, res) => {
  const { id } = req.params;

  const data = await (await db.collection("items").doc(id).get()).data();

  if (!data) return;

  console.log(data);

  res.json(data);
});
//редактирование товара
app.patch("/items/:id", async (req, res) => {
  const { id } = req.params; // id товара
  const body = req.body; // тело запроса (данные для изменения)

  await db.collection("items").doc(id).set(body);

  res.json({ status: "succesfull" });
});
// создание товара
app.post("/newitem", async (req, res) => {
  const body = req.body; // тело запроса (данные о товаре)

  const id = uuid(); // id будущего товара

  await db
    .collection("items")
    .doc(id)
    .set({ ...body, id });

  res.json({ status: "success", id });
});
// удаление товара
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params; // id товара

  (await db.collection("items").doc(id).get()).ref.delete();

  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
