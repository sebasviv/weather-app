
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home/HomeComponent"
import LoginComponent from "./components/Login/LoginComponent";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Register from "./components/Register/RegisterComponent"
import { AuthProvider } from './context/autchContext'
import "./styles/index.scss";


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home></Home></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App