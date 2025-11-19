import './App.css'

import { Routes, Route } from 'react-router'

import Layout from './components/Layout'
import Home from './pages/Home'
import UnderMaintenance from './components/UnderMaintenance'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<UnderMaintenance />} />
        <Route path="/projects/:project_slug" element={<UnderMaintenance />} />
        <Route path="/experience" element={<UnderMaintenance />} />
        <Route path="/gallery" element={<UnderMaintenance />} />
        <Route path="/chatbot" element={<UnderMaintenance />} />
        <Route path="/settings" element={<UnderMaintenance />} />
        <Route path="/:path" element={<UnderMaintenance />} />
      </Route>
    </Routes>
  )
}

export default App