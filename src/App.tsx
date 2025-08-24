import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Resume from "@/pages/Resume";
import Background from "@/components/Background";

export default function App() {
  return (
    <div className="min-h-screen">
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        {/* 404Ò³ÃæÂ·ÓÉ */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}
