import { Message, messageSchema } from "./chat.types";

import { Promiser } from "@sqlite.org/sqlite-wasm";

export async function listAllMessages(promiser: Promiser) {
  let rows: Message[] = [];
  await promiser("exec", {
    sql: "SELECT * FROM chat",
    callback: (result) => {
      if (result.row) {
        try {
          const message = messageSchema.parse({
            id: result.row[0],
            message: result.row[1],
          });
          rows.push(message);
        } catch (e) {
          console.error("Invalid row:", result.row, e);
        }
      }
    },
  });
  return rows;
}
