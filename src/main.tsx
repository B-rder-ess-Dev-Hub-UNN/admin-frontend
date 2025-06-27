import { StrictMode } from "react";
import { AuthProvider } from "./context/authContext.tsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CheckInProvider } from "./context/checkInContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CheckInProvider>
        {" "}
        <App />
      </CheckInProvider>
    </AuthProvider>
  </StrictMode>
);
