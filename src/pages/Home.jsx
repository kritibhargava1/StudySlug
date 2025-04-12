import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-8">
          Welcome to SlugStudy 🐌
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate('/how-it-works')} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            How it works
          </button>
          <button onClick={() => navigate('/contact')} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Contact us
          </button>
          <button onClick={() => navigate('/signup')} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Sign up page
          </button>
          <button onClick={() => navigate('/tutors')} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Need help in a subject?
          </button>
          <button onClick={() => navigate('/study-groups')} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Looking for a study group?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
