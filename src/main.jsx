import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListaInciden } from "./contexts/IncidenciasContext.jsx";
// import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LoginProvider } from "./contexts/LoginContext.jsx";

const queryclient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryclient}>
    <LoginProvider>
        <ListaInciden>
          <App />
        </ListaInciden>
    </LoginProvider>
  </QueryClientProvider>

  // </StrictMode>,
);
