import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BodyComponent from "./component/BodyComponent.jsx";
import AddQuestions from "./component/AddQuestions.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<BodyComponent />} />
          <Route path="/add-questions" element={<AddQuestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
