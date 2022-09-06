import Home from "./pages/Home/Home";
import { BrowserRouter as Router,Routes, Route,Navigate } from "react-router-dom"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";




function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element = {user ? <Home/> : <Login/>}/>
         
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
          
        <Route path="/register" element={user ? <Navigate to="/" /> :  <Register/>}/> 
          
        <Route path="/profile/:username" element={<Profile/>}/>
          
      </Routes>
    </Router>
      
      
    
  );
}

export default App;
