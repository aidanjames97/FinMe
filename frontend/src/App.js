import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import Home from './components/layouts/Home'
import Register from "./components/accounts/Register"
import Login from "./components/accounts/Login"
import Profile from "./components/accounts/Profile"
import Dashboard from "./components/layouts/active/Dashboard"
import ErrorMessage from "./components/layouts/popouts/ErrorMessage"
import SignInMessage from "./components/layouts/popouts/SignInMessage"
import SignOutMessage from "./components/layouts/popouts/SignOutMessage"
import ProfileUpdated from "./components/layouts/popouts/ProfileUpdated"
import WithPrivateRouting from "./utils/WithPrivateRoute" // middleware ensuring user is signed in (else direct to login page)

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorMessage />
        <SignInMessage />
        <SignOutMessage />
        <ProfileUpdated />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path='/profile' 
              element={
                <WithPrivateRouting>
                  <Profile />
                </WithPrivateRouting>
              } />
            <Route exact path='/dashboard' 
              element={
                <WithPrivateRouting>
                  <Dashboard />
                </WithPrivateRouting>
              } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App