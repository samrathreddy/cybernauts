import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { TeamPage } from "./screens/TeamPage/TeamPage";
import { Events } from "./screens/Events/Events";
import { Register } from "./screens/Events/Register";
import { Cypher } from "./screens/Cypher";
import { Bounce, ToastContainer } from 'react-toastify';

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/cypher" element={<Cypher />} />
        <Route path="/event/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
  </StrictMode>,
);
