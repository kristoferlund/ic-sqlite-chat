import "./index.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import DatabaseProvider from "./database/DatabaseProvider";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DatabaseProvider>
        <App />
      </DatabaseProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
