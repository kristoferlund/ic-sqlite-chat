import { z } from "zod";

export const changeSchema = z.object({
  id: z.bigint(),
  table_name: z.string(),
  operation: z.enum(["INSERT", "UPDATE", "DELETE"]),
  row_id: z.bigint(),
  new_values: z.string(),
});

export type Change = z.infer<typeof changeSchema>;
