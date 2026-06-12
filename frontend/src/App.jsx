import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import ChatBot from "./pages/ChatBot";
import GPDashboard from "./pages/GPDashboard";

import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login/:role" element={<Login />} />

        <Route path="/register/:role" element={<Register />} />

        <Route path="/patient" element={<PatientDashboard />} />

        <Route path="/chat" element={<ChatBot />} />

        <Route path="/gp" element={<GPDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;