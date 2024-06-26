import { useContext } from "react";
import { DatabaseContext, DatabaseContextType } from "../DatabaseProvider";

export default function useDatabaseContext(): DatabaseContextType {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error(
      "useDatabaseContext must be used within an DatabaseContextProvider",
    );
  }
  return context;
}
