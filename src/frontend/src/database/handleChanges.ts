import { Promiser } from "@sqlite.org/sqlite-wasm";
import { Change } from "../change/change.types";

function safeSqlString(str: string) {
  return `'${str.replace(/'/g, "''")}'`;
}

async function handleInsert(change: Change, promiser: Promiser) {
  const values = JSON.parse(change.new_values);
  await promiser("exec", {
    sql: `INSERT INTO ${change.table_name}
      (${Object.keys(values).join(", ")})
      VALUES
      (${Object.values(values)
        .map((v) => safeSqlString(v as string))
        .join(", ")})`,
  });
}

export async function handleChanges(changes?: Change[], promiser?: Promiser) {
  if (!changes || changes.length === 0) return;
  if (!promiser) return;
  for (const change of changes) {
    if (change.operation === "INSERT") {
      await handleInsert(change, promiser);
    }
  }
}
