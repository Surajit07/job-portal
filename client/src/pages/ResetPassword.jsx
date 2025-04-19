import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  
  const handleReset = async () => {
    try {
      await axios.post(`http://localhost:7000/api/auth/reset-password/${token}`, { newPassword });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to reset password");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 py-12 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
          <p className="text-gray-600">Enter your new password below</p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 focus:border-green-500 outline-none transition"
          />
        </div>
        
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            Make sure to choose a strong password that you haven't used before.
          </p>
        </div>
        
        <button 
          onClick={handleReset} 
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 font-medium shadow-sm focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
        >
          Update Password
        </button>
        
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Return to login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;