import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { TeamPage } from "./screens/TeamPage/TeamPage";
import { Events } from "./screens/Events/Events";
import { Cypher } from "./screens/Cypher";
import { Passes } from "./screens/Passes";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/cypher" element={<Cypher />} />
        <Route path="/passes" element={<Passes />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
