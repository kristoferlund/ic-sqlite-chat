import { DB_FILE } from "../DatabaseProvider";
import { Promiser } from "@sqlite.org/sqlite-wasm";
import { backend } from "../../../../backend/declarations";

export async function openDatabase(promiser: Promiser) {
  const opfsRoot = await navigator.storage.getDirectory();
  const file = await opfsRoot.getFileHandle(DB_FILE, {
    create: true,
  });
  const writable = await file.createWritable();
  const db = await backend.db_get();
  await writable.write(db as Uint8Array);
  await writable.close();
  await promiser("open", {
    filename: `file:${DB_FILE}?vfs=opfs`,
  });
}
