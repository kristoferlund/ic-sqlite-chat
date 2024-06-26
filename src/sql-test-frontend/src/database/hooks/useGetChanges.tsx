import { useQuery } from "@tanstack/react-query";
import { Promiser } from "@sqlite.org/sqlite-wasm";
import { getLatestChangeId } from "../../change/change.db";
import { parseChangesResponse } from "../../change/utils/parseChangesResponse";
import { sql_test_backend } from "../../../../sql-test-backend/declarations";

export function useGetChanges(promiser: Promiser | undefined) {
  return useQuery({
    queryKey: ["new_changes"],
    queryFn: async () => {
      if (!promiser) return;
      const latestId = await getLatestChangeId(promiser);
      const rawChanges = await sql_test_backend.changes_get(BigInt(latestId));
      return parseChangesResponse(rawChanges);
    },
    refetchInterval: 10000,
    enabled: !!promiser,
  });
}
