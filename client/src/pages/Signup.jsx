import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:7000/api/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join us today and get started</p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>
        
        <button 
          onClick={handleSignup} 
          className="w-full py-3 px-4 h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium mt-6 transition focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        >
          Create Account
        </button>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? 
          <a href="/login" className="ml-1 font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
