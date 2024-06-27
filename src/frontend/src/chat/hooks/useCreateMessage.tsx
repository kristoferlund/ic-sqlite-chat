import { backend } from "../../../../backend/declarations";
import { getLatestChangeId } from "../../change/change.db";
import { parseChangesResponse } from "../../change/utils/parseChangesResponse";
import useDatabaseContext from "../../database/hooks/useDatabaseContext";
import { useMutation } from "@tanstack/react-query";

export function useCreateMessage() {
  const { promiser } = useDatabaseContext();

  return useMutation({
    mutationKey: ["message_create"],
    mutationFn: async ({ message }: { message: string }) => {
      if (!promiser) return null;
      const latestChangeId = await getLatestChangeId(promiser);
      const result = await backend.message_create(
        {
          message,
        },
        latestChangeId
      );
      if ("Ok" in result) {
        const rawChanges = result.Ok;
        return parseChangesResponse(rawChanges);
      }
      return null;
    },
  });
}
