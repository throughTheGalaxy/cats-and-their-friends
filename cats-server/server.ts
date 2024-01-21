import express, { Request, Response } from "express";
import { db } from "./firebase";
import { v4 as uuid } from "uuid";
import cors from "cors";
import "dotenv";
import type { IItem, ILogin, IUser } from "./types";

const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(express.json());
// receiving of all goods
app.get("/items", async (req: Request, res: Response) => {
  const data = (await db.collection("items").get()).docs;
  const items: IItem[] = [];

  data.forEach((item) => {
    items.push(item.data() as IItem);
  });

  res.json(items);
});
// receiving info about good 
app.get("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = (await (
    await db.collection("items").doc(id).get()
  ).data()) as IItem;

  if (!data) return;

  res.json(data);
});
// edit goods
app.patch("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // id good
  const body = req.body as Partial<IItem>; // body of request

  await db.collection("items").doc(id).set(body);

  res.json({ status: "succesfull" });
});
// create good
app.post("/newitem", async (req: Request, res: Response) => {
  const body = req.body as Omit<IItem, "id">; // body of request

  const id: string = uuid(); // id the future good

  await db
    .collection("items")
    .doc(id)
    .set({ ...body, id });

  res.json({ status: "success", id });
});
// delete good
app.delete("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // id good

  (await db.collection("items").doc(id).get()).ref.delete();

  res.sendStatus(200);
});

// entrance

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body as ILogin;

  if (!username || !password) return;

  const user = (
    await db.collection("users").where("username", "==", username).get()
  )?.docs[0]?.data() as IUser;

  username == user?.username && password == user?.password
    ? res.status(200).json({ token: user.token })
    : res.status(401).json({ status: "Unauthorized" });
});

// select the role of user

app.get("/role/:token", async (req: Request, res: Response) => {
  const token = req.params.token;

  const user = (await (
    await db.collection("users").doc(token).get()
  ).data()) as IUser;

  if (!user) return;

  res.json({ isAdmin: user.role === "admin" });
});

app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
