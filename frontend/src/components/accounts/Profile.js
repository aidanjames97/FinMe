import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../images/arrow.png"
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserProfile, setError, handleProfileUpdateSuccess } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const user = currentUser;
      const profile = {
        displayName: username,
      };
      await updateUserProfile(user, profile);
      handleProfileUpdateSuccess()
      navigate("/");
    } catch (e) {
      setError("Failed to update profile");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className='fixed top-5 left-5'>
        <Link
          to='/'
          className='flex text-white rounded border border-transparent hover:border-violet-600 hover:bg-violet-600/10 p-2 transition duration=600'
        >
          <img src={Arrow} alt='' className='h-4 w-3 mt-1 mr-2'/>Home
        </Link>
      </div>
      <div className="max-w-md w-full space-y-8">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 placeholder-white text-white bg-violet-600/10 border border-violet-600/80 text-sm focus:outline-none sm:text-sm"
              placeholder="Enter a Display Name"
              defaultValue={currentUser.displayName && currentUser.displayName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="rounded w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-violet-600/80 hover:bg-violet-600 transition duration=600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}