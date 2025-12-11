import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Round from './pages/Round'
import Rounds from './pages/Rounds'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/rounds" element={<Rounds />} />
      <Route path="/rounds/:id" element={<Round />} />
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default App
