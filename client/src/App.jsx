import './App.css'
import { Route, Routes } from 'react-router-dom'
import Esc from './pages/Esc.jsx'
import Home from './pages/Home.jsx'
import Leaderboards from './pages/Leaderboards.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/esc" element={<Esc />} />
      <Route path="/leaderboards" element={<Leaderboards />} />
    </Routes>
  )
}

export default App