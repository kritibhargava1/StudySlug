import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith('@ucsc.edu')) {
      setError('Please use a @ucsc.edu email to log in.');
      return;
    }
    // TODO: Replace with Firebase login
    alert('Logged in with: ' + email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">SlugStudy 🐌</h1>
        <p className="mb-6 text-gray-600">Login with your UCSC email to begin.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@ucsc.edu"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Log In
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
