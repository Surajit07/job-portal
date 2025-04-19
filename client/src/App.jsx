import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import ApplyJob from "./pages/Applyjobs.jsx";
import ForgotPassword from "./pages/Forgotpassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import PostJob from "./pages/Postjob.jsx";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/apply/:jobId" element={<ApplyJob/>} />
        <Route path="/forgot-Password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="/post-job" element={<PostJob/>} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   {/* <Home/> */}
    //   <Login/>
    // </div>
  );
}

export default App;