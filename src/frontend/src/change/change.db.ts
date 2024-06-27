import { Promiser } from "@sqlite.org/sqlite-wasm";

export async function getLatestChangeId(promiser: Promiser) {
  let latestId = 0n;
  await promiser("exec", {
    sql: "SELECT MAX(id) FROM changes",
    callback: (result) => {
      if (result.row) {
        latestId = result.row[0];
      }
    },
  });
  return latestId;
}
