import { listAllMessages } from "../chat.db";
import useDatabaseContext from "../../database/hooks/useDatabaseContext";
import { useQuery } from "@tanstack/react-query";

export function useMessages() {
  const { promiser } = useDatabaseContext();
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      console.log("usePersons", promiser ? "promiser" : "NO promiser");
      if (!promiser) return null;
      return listAllMessages(promiser);
    },
  });
}
