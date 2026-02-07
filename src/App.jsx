import './App.css'

import { Routes, Route } from 'react-router'

import Layout from './components/Layout'
import Home from './pages/Home'
import UnderMaintenance from './components/UnderMaintenance'
import Projects from './components/Projects/Projects'
import ProjectDetail from './components/Projects/ProjectDetail'
import Experience from './components/Experience/Experience'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:project_slug" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/gallery" element={<UnderMaintenance />} />
        <Route path="/chatbot" element={<UnderMaintenance />} />
        <Route path="/settings" element={<UnderMaintenance />} />
        <Route path="/:path" element={<UnderMaintenance />} />
      </Route>
    </Routes>
  )
}

export default App