import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl p-8 rounded-2xl">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={() => navigate('/how-it-works')} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">How it works</button>
          <button onClick={() => navigate('/contact')} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Contact us</button>
          <button onClick={() => navigate('/signup')} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Sign up page</button>
          <button onClick={() => navigate('/tutors')} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Need help in a subject?</button>
          <button onClick={() => navigate('/study-groups')} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Looking for a study group?</button>
        </div>

        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">Welcome to SlugStudy 🐌</h1>
      </div>
    </div>
  );
}

export default Home;
