import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ModalContextProvider from "./contexts/ModalContext.jsx";
import NoteGroupsContextProvider from "./contexts/NoteGroupsContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalContextProvider>
      <NoteGroupsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NoteGroupsContextProvider>
    </ModalContextProvider>
  </React.StrictMode>
);
