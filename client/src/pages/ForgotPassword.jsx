import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  const handleRequestReset = async () => {
    try {
        const res = await axios.post("http://localhost:7000/api/auth/forgot-password", { email });
    //   alert(`Reset Link: ${res.data.resetLink}`);
        const resetLink = res.data.resetLink;
        // Navigate to the reset password page
        const token = resetLink.split("/").pop(); // extract the token
        navigate(`/reset-password/${token}`);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send reset link");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h2>
          <p className="text-gray-600">Enter your email to receive a password reset link</p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <button 
          onClick={handleRequestReset} 
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-medium shadow-sm focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        >
          Send Reset Link
        </button>
        
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;