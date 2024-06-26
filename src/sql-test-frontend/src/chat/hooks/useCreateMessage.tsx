import { getLatestChangeId } from "../../change/change.db";
import { parseChangesResponse } from "../../change/utils/parseChangesResponse";
import { sql_test_backend } from "../../../../sql-test-backend/declarations";
import useDatabaseContext from "../../database/hooks/useDatabaseContext";
import { useMutation } from "@tanstack/react-query";

export function useCreateMessage() {
  const { promiser } = useDatabaseContext();

  return useMutation({
    mutationKey: ["message_create"],
    mutationFn: async ({ message }: { message: string }) => {
      if (!promiser) return null;
      const latestChangeId = await getLatestChangeId(promiser);
      const result = await sql_test_backend.message_create(
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
