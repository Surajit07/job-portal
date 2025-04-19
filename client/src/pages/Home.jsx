import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:7000/api/jobs").then((res) => {
      setJobs(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
          <p className="text-gray-600 mt-2">Discover your next career opportunity</p>
        </header>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/post-job")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300 font-medium"
          >
            Post a Job
          </button>
        </div>
        
        {jobs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-500">Loading job listings...</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li 
                key={job._id} 
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h2>
                      <div className="flex items-center text-gray-600 mb-3">
                        <span>{job.company}</span>
                        <span className="mx-2">•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/apply/${job._id}`} 
                      className="bg-blue-600 inline-block text-black px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium"
                    >
                      Apply Now
                    </Link>
                  </div>
                  
                  {job.description && (
                    <p className="text-gray-600 mt-2 line-clamp-2">{job.description}</p>
                  )}
                  
                  {job.tags && job.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Looking for more opportunities? Check back soon for updated listings.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;