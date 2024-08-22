import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../../images/googleLogo.png"
import Arrow from "../../images/arrow.png"
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, login, setError, loginGoogle, handleSignInSuccess } = useAuth();

  useEffect(() => {
    if(currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  async function handleFormSubmit() {
    // get form values and register user
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      handleSignInSuccess()
      navigate('/');
    } catch (e) {
      setError("Failed to login")
    }

    setLoading(false)
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await loginGoogle();
      handleSignInSuccess();
      navigate('');
    } catch (e) {
      setError('Failed to login')
    }
    setLoading(false)
  }

  // if loading registration
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="rounded-full h-28 w-28 bg-violet-600 animate-ping"></div>
      </div>
    )
  }
  // not loading, display page

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
        <div>
          <h2 className="mt-4 text-3xl text-center font-light">
            Login to your account
          </h2>
        </div>
        <form 
          className="mt-8 space-y-6"
          onSubmit={() => handleFormSubmit()}
          >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mb-2 appearance-none rounded relative block w-full px-3 py-2 placeholder-white text-white bg-violet-600/10 border border-violet-600/80 text-gray-900 text-sm focus:outline-none sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 placeholder-white text-white bg-violet-600/10 border border-violet-600/80 text-gray-900 text-sm focus:outline-none sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="rounded w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-violet-600/80 hover:bg-violet-600 transition duration=600"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="/register"
              className="text-white hover:underline"
            >
              Don't have an account? Register
            </Link>
          </div>
        </div>

        <div className='flex w-full place-content-around items-centre'>
          <span className='h-0.5 w-1/3 my-5 bg-violet-600/80 rounded'></span>
          <h1 className='my-2'>or</h1>
          <span className='h-0.5 w-1/3 my-5 bg-violet-600/80 rounded'></span>
        </div>

        <button
          className="rounded w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-violet-600/80 hover:bg-violet-600 transition duration=600"
          onClick={() => handleGoogleSignIn()}
        >Sign In With Google <img src={GoogleLogo} alt='google' className='h-5 w-5 ml-5'/>
        </button>
      </div>
    </div>
  )
}