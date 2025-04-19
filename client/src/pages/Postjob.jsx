import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      await axios.post("http://localhost:7000/api/jobs/post", {
        title,
        company,
        location,
        description,
      },{ withCredentials: true });
      alert("Job posted successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Job post failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New Job Listing</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            className="w-full px-3 py-2 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            placeholder="e.g. Senior Developer, Marketing Manager"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            className="w-full px-3 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Your company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            className="w-full px-3 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="City, State or Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Describe the role, responsibilities, and requirements"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mt-8">
        <button
          onClick={handlePost}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          Publish Job Listing
        </button>
      </div>
    </div>
  );
}

export default PostJob;