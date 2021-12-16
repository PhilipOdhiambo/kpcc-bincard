import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
// import * as path from "path";


import * as fs from "fs";


admin.initializeApp();
const app = express();
// const main = express();

// main.use("/api", app);
app.use(cors);
app.use(express.json());


const db = admin.firestore();

export const api = functions.https.onRequest(app);

interface InI {
  code: string;
  unit: string;
  description: string;
  buying: string;
  markup: string;
  selling: string;
}

interface InventoryI {
  id?: string;
  code: string;
  unit: string;
  description: string;
  buying: string;
  markup: string;
  selling: string;
}

const d = fs.readFileSync("functions/lib/inv.json", {encoding: "utf-8"});
const data =JSON.parse(d);

app.get("./inventory", async (req, res) => {
  localStorage.setItem
  res.status(200).send(data);
});

app.post("/inventory", async (req, res) => {
  const docRef = db.collection("inventory").doc();
  const reqBody: InI = req.body;
  const newId = docRef.id;
  const newInventory: InventoryI = {
    buying: reqBody.buying, code: reqBody.code,
    description: reqBody.description, markup: reqBody.markup,
    selling: reqBody.selling, unit: reqBody.unit, id: newId,
  };
  res.status(200).send(newInventory);
});

