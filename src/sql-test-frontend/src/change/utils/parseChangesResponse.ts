import { Change, changeSchema } from "../change.types";

export function parseChangesResponse(
  rawChanges: Array<[bigint, string, string, bigint, string]>,
) {
  let changes: Change[] = [];
  if (rawChanges.length > 0) {
    for (const rawChange of rawChanges) {
      const change = changeSchema.parse({
        id: rawChange[0],
        table_name: rawChange[1],
        operation: rawChange[2],
        row_id: rawChange[3],
        new_values: rawChange[4],
      });
      changes.push(change);
    }
  }
  return changes;
}
