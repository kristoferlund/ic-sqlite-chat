import { z } from "zod";

export const messageSchema = z.object({
  id: z.number(),
  message: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
