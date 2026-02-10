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
        <Route path="/settings" element={<UnderMaintenance />} />
        <Route path="/:path" element={<UnderMaintenance />} />
      </Route>
      <Route element={<Layout footer={false}/>}>
        <Route path="/chatbot" element={<Chatbot />} />
      </Route>
    </Routes>
  );
}

export default App;
