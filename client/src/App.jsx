import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Register from "./pages/users/Register"
import Login from "./pages/users/Login"
import Dashboard from "./pages/users/Dashboard"
import Home from "./pages/posts/Home"
import Create from "./pages/posts/Create"
import Update from "./pages/posts/Update"
import GuestRoutes from "./routes/GuestRoutes"
import AuthRoutes from "./routes/AuthRoutes"

const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>

        <Route element={<GuestRoutes />}>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
        </Route>

        <Route element={<AuthRoutes />}>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="new-post" element={<Create />}/>
          <Route path="update-post" element={<Update />}/>
        </Route>

      </Route>

      
    </Routes>
  </BrowserRouter>
  )
}
export default App
