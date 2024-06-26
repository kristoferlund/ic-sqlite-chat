import { Promiser } from "@sqlite.org/sqlite-wasm";
import { sql_test_backend } from "../../../../sql-test-backend/declarations";
import { DB_FILE } from "../DatabaseProvider";

export async function openDatabase(promiser: Promiser) {
  const opfsRoot = await navigator.storage.getDirectory();
  const file = await opfsRoot.getFileHandle(DB_FILE, {
    create: true,
  });
  const writable = await file.createWritable();
  const db = await sql_test_backend.db_get();
  await writable.write(db as Uint8Array);
  await writable.close();
  await promiser("open", {
    filename: `file:${DB_FILE}?vfs=opfs`,
  });
  console.log("Database opened");
}
