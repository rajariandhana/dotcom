import './App.css'

import { Routes, Route } from 'react-router'

import Layout from './components/Layout'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" />
        <Route path="/experience" />
        <Route path="/photos" />
        <Route path="/chatbot" />
        <Route path="/settings" />
      </Route>
    </Routes>
  )
}

export default App