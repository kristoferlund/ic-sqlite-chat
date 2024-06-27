import { Promiser } from "@sqlite.org/sqlite-wasm";
import { getLatestChangeId } from "../../change/change.db";
import { parseChangesResponse } from "../../change/utils/parseChangesResponse";
import { backend } from "../../../../backend/declarations";
import { useQuery } from "@tanstack/react-query";

export function useGetDatabaseChanges(promiser: Promiser | undefined) {
  return useQuery({
    queryKey: ["changes_get"],
    queryFn: async () => {
      if (!promiser) return;
      const latestId = await getLatestChangeId(promiser);
      const rawChanges = await backend.changes_get(BigInt(latestId));
      return parseChangesResponse(rawChanges);
    },
    refetchInterval: 10000,
    enabled: !!promiser,
  });
}
