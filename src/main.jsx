import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListaInciden } from "./contexts/IncidenciasContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const queryclient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryclient}>
    <AuthProvider>
      <ListaInciden>
        <App />
      </ListaInciden>
    </AuthProvider>
  </QueryClientProvider>

  // </StrictMode>,
);
