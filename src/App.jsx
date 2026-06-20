import "swiper/css";
import "swiper/css/navigation";
import "./App.css";

import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import UnderMaintenance from "./components/UnderMaintenance";
import Projects from "./components/Projects/Projects";
import ProjectDetail from "./components/Projects/ProjectDetail";
import Experience from "./components/Experience/Experience";
import Chatbot from "./components/Chatbot/Chatbot";
import Gallery from "./components/Gallery/Gallery";
import GalleryPhotos from "./components/Gallery/GalleryPhotos";
import History from "./components/History/History";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Cipher from "./components/Chiper/Chiper";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:project_slug" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:album_name" element={<GalleryPhotos />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<UnderMaintenance />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/:path" element={<UnderMaintenance />} />
      </Route>
      <Route element={<Layout footer={false} />}>
        <Route path="/chatbot" element={<Chatbot />} />
      </Route>
      <Route path="/bad-cipher" element={<Cipher />}></Route>
    </Routes>
  );
}

export default App;
