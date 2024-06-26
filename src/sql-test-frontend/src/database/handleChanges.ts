// fn list_all_changes() -> Vec<(u64, String, String, u64, String)> {
// DB.with(|db| {
//     let mut db = db.borrow_mut();
//     let db = db.as_mut().unwrap();
//     let mut stmt = db
//         .prepare("SELECT id, table_name, operation, row_id, new_values FROM changes")

import { Promiser } from "@sqlite.org/sqlite-wasm";
import { Change } from "../change/change.types";
// import { personChangeSchema } from "../person/person.types";

function safeSqlString(str: string) {
  return `'${str.replace(/'/g, "''")}'`;
}

// async function handlePersonChange(change: Change, promiser: Promiser) {
//   if (change.operation === "INSERT") {
//     const personChange = personChangeSchema.parse(
//       JSON.parse(change.new_values),
//     );
//     await promiser("exec", {
//       sql: `INSERT INTO person (name, data) VALUES (
//         '${safeSqlString(personChange.name)}',
//         '${safeSqlString(personChange.data)}'
//       )`,
//     });
//   }
// }

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
    // if (change.table_name === "person") {
    //   await handlePersonChange(change, promiser);
    // }
    if (change.operation === "INSERT") {
      await handleInsert(change, promiser);
    }
  }
}
