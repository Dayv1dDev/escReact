import './App.css';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext.jsx';
import Esc from './pages/Esc.jsx';
import Home from './pages/Home.jsx';
import Leaderboards from './pages/Leaderboards.jsx';
import Login from './pages/Login.jsx';
import Games from './pages/Games.jsx';
import React from './pages/React.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/games" element={<Games />}>
          <Route path="/games/esc" element={<Esc />} />
          <Route path="/games/react" element={<React />} />
        </Route>
        <Route path="/leaderboards" element={<Leaderboards />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App