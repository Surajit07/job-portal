import { useParams } from "react-router-dom";
import axios from "axios";

function ApplyJob() {
  const { jobId } = useParams();
  
  const handleApply = async () => {
    try {
      await axios.post(`http://localhost:7000/api/jobs/apply/${jobId}`, {}, { withCredentials: true });
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Application failed");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 py-12 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Apply for Job</h2>
          <p className="text-gray-600">Complete your application</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Your profile will be shared. Make sure your information is up to date.
          </p>
        </div>
        
        <button 
          onClick={handleApply} 
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 font-medium shadow-sm focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
        >
          Submit Application
        </button>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-blue-600 hover:text-blue-500">
            Back to job listings
          </a>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;