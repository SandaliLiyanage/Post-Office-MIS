import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 max-w-md text-center">
        <p className="text-gray-700 mb-6">
          You don't have permission to view this page. Please login with an authorized account or return to the home page.
        </p>
        <button
          onClick={() => navigate('/dashboard/viewMail')}
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
