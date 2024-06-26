import { Promiser, sqlite3Worker1Promiser } from "@sqlite.org/sqlite-wasm";
import React, { createContext, useEffect, useState } from "react";

import { handleChanges } from "./handleChanges";
import { openDatabase } from "./utils/openDatabase";
import { queryClient } from "../main";
import { useGetChanges } from "./hooks/useGetChanges";

export const DB_FILE = "db.sqlite";

type DatabaseContextState = {
  promiser?: Promiser;
  isInitializing: boolean;
  isError: boolean;
  error?: Error;
};

export type DatabaseContextType = {
  promiser?: Promiser;
  isInitializing: boolean;
  isError: boolean;
  error?: Error;
};

export const DatabaseContext = createContext<DatabaseContextType | undefined>(
  undefined,
);

export default function DatabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<DatabaseContextState>({
    isInitializing: true,
    isError: false,
  });
  const { data: newChanges } = useGetChanges(state.promiser);

  // Initialize the database
  useEffect(() => {
    (async () => {
      const promiser = await sqlite3Worker1Promiser.v2();
      await openDatabase(promiser);
      setState({ ...state, promiser, isInitializing: false });
    })();
  }, []);

  // Handle new changes
  useEffect(() => {
    (async () => {
      if (newChanges && newChanges.length > 0) {
        await handleChanges(newChanges, state.promiser);
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      }
    })();
  }, [newChanges]);

  return (
    <DatabaseContext.Provider
      value={{
        promiser: state.promiser,
        isInitializing: state.isInitializing,
        isError: state.isError,
        error: state.error,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}
