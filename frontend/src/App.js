import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import Home from './components/layouts/Home'
import Register from "./components/accounts/Register"
import Login from "./components/accounts/Login"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App