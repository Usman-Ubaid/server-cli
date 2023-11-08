import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url);

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, { encoding: "utf-8" });
  return JSON.parse(db);
};
